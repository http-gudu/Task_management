import React, { useState , useEffect } from "react";
import Cards from "../component/home/cards";
import InputData from "../component/home/inputdata";
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from "axios";

const AllTask = () => {
  const [InputDiv, setInputDiv] = useState("hidden");
  const [Data, setData] = useState()
  const headers = {id:localStorage.getItem("id"), authorization:`Bearer ${localStorage.getItem("token")}`};
  useEffect(() => {
    const fetch = async () =>{
      try {
       const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks",{headers});
       setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetch();
   },[]);
  console.log(Data);
  return (
  <>
    <div>
    <div className="w-full flex justify-end px-4 py-2">
      <button onClick={() => setInputDiv("fixed")}><IoIosAddCircleOutline className="text-5xl text-gray-600 hover:text-gray-100 transition-all duration-300"/></button>
    </div> 
    {Data && (
      <Cards home={"true"} setInputDiv={setInputDiv} data={Data.tasks}/> 
      )}
  </div>
  <InputData InputDiv = {InputDiv} setInputDiv= {setInputDiv}/>
  </>
  );
};

export default AllTask;