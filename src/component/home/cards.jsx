import React from "react";
import { CiStar } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const Cards = ({ home, setInputDiv, data = [] }) => {
    // Ensure data is always an array
    const taskData = Array.isArray(data) ? data : [];

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    };

    const handleCompleteTask = async (id) => {
        try {
            await axios.put(
                `http://localhost:1000/api/v2/update-complete-task/${id}`,
                {},
                { headers }
            );
        } catch (error) {
            console.error("Error completing task:", error);
        }
    };

    const handleImportant = async (id) => {
        try {
            const response = await axios.put(
                `http://localhost:1000/api/v2/update-imp-task/${id}`,
                {},
                { headers }
            );
            console.log(response);
        } catch (error) {
            console.error("Error marking task as important:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            const response = await axios.delete(
                `http://localhost:1000/api/v2/delete-task/${id}`,
                { headers }
            );
            console.log(response.data.message);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            {taskData.map((item, i) => (
                <div key={item._id} className="flex flex-col justify-between border border-yellow-300 rounded-xl p-4">
                    <div>
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <p className="text-gray-400 my-2">{item.desc}</p>
                    </div>
                    <div className="mt-4 w-full flex items-center">
                        <button
                            className={`${item.complete ? "bg-green-500" : "bg-yellow-400"} px-2 py-1 rounded w-4/6`}
                            onClick={() => handleCompleteTask(item._id)}
                        >
                            {item.complete ? "Completed" : "Incomplete"}
                        </button>
                        <div className="text-white p-2 w-2/6 text-xl flex justify-around">
                            <button onClick={() => handleImportant(item._id)}>
                                {item.important ? <FaStar className="text-red-500" /> : <CiStar />}
                            </button>
                            <button>
                                <CiEdit />
                            </button>
                            <button onClick={() => deleteTask(item._id)}>
                                <MdOutlineDelete />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {home === "true" && (
                <button
                    className="flex flex-col justify-center items-center border border-yellow-300 rounded-xl p-4 text-gray-400 hover:scale-105 hover:cursor-pointer transition-all duration-300"
                    onClick={() => setInputDiv("fixed")}
                >
                    <IoIosAddCircleOutline className="text-8xl" />
                    <h2 className="text-2xl mt-4">Add Task</h2>
                </button>
            )}
        </div>
    );
};

export default Cards;
