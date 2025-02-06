import React,{useState} from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";


const InputData = ({InputDiv,setInputDiv}) => {
    const [Data, setData] = useState({title:"", desc:""});
    const headers = {id:localStorage.getItem("id"), authorization:`Bearer ${localStorage.getItem("token")}`};
    const change = (e) =>{
        const {name, value} = e.target;
        setData({...Data, [name]:value});
    };
    const submitData = async() =>{
        if(Data.title === "" || Data.desc === ""){
            alert("Please fill the data");
        } else {
            await axios.post("http://localhost:1000/api/v2/create-task",Data,{headers});
        }
    }
    return (<>
        <div className={`${InputDiv} top-0 left-0     backdrop-blur h-screen w-full`}></div>
        <div className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
            <div className="w-2/6 bg-gray-500 p-4 rounded">
                <div className="flex justify-end">
                    <button className="text-2xl" onClick={()=> setInputDiv("hidden")}><RxCross2 /></button>
                </div>
                <input type="text" placeholder="Title" name="title" className="px-3 py-2 rounded w-full bg-gray-700 my-3" value={Data.title} onChange={change}/>
                <textarea name="desc" id="" cols="30" rows="10" placeholder="What's the task" className="px-3 py-2 rounded w-full bg-gray-700 my-3" value={Data.desc}  onChange={change}></textarea>
                 <button className="px-3 py-2 bg-green-600 rounded text-black text-xl font-semibold" onClick={submitData}>Submit</button>
            </div>
        </div>
    </>);
};

export default InputData;