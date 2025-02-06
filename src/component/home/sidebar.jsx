import React , { useEffect , useState} from "react";
import { CgNotes } from "react-icons/cg";
import { MdImportantDevices } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { MdIncompleteCircle } from "react-icons/md";
import { Link , useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";

const Sidebar = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const data = [
        {
            title: "All tasks",
            icons:<CgNotes />,
            link: "/",
        },
        {
            title: "Important tasks",
            icons: <MdImportantDevices />,
            link: "/importanttask",
        },
        {
            title: "Completed tasks",
            icons: <FaCheck />,
            link: "/completedtask",
        },
        {
            title: "Incompleted tasks",
            icons: <MdIncompleteCircle />,
            link: "/incompletedtask",
        },
    ];
    const [Data, setData] = useState()
    const logout = () => {
        dispatch(authActions.logout());
        localStorage.clear("id");
        localStorage.clear("token");
        history("/signup");
    };
    const headers = {id:localStorage.getItem("id"), authorization:`Bearer ${localStorage.getItem("token")}`};
    useEffect(() => {
     const fetch = async () =>{
        const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks",{headers});
        setData(response.data.data);
     };
     fetch();
    });
    
    return (<>
        {Data && <div>
            <h2 className="text-xl font-bold">{Data.username}</h2>
            <h4 className="mb-1 text-gray-400">{Data.email}</h4>
            <hr />
        </div>}
        <div>
            {data.map((items, i)=> (
               <Link 
               to={items.link} 
               key={i} 
               className="my-2 flex items-center hover:bg-yellow-300 p-2 rounded transition-all duration-300 ">{items.icons} &nbsp; {items.title} 
               </Link>
            ))}
        </div>
        <div><button className="bg-yellow-300 w-full p-2 rounded" onClick={logout}>Log Out</button></div>
        </>
    );
};

export default Sidebar;