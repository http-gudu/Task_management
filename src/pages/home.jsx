import React from "react";
import Sidebar from "../component/home/sidebar";
import { Outlet } from "react-router-dom";  

const Home = () => {
  return <div className="flex h-[98vh] gap-4">
    <div className="border border-yellow-200 rounded-xl p-4 w-1/6  flex flex-col justify-between "><Sidebar/></div>
    <div className=" border border-yellow-200 rounded-xl p-4 w-5/6">
        <Outlet />
    </div>
  </div>;
};

export default Home;