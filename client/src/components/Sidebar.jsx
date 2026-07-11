import { PiBrainBold } from "react-icons/pi";
import { HiOutlineCollection } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({topics,darkMode,setDarkMode}){
    const [showMenu,setShowMenu] = useState(false);
    const navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }
    const user=JSON.parse(
        localStorage.getItem("user") || "{}"
    );
    return(
        <div className={`flex flex-col h-screen w-1/4 md:w-64 lg:w-72 p-5 ${darkMode? "bg-gradient-to-b from-slate-950 to-indigo-950": "bg-gradient-to-b from-gray-100 to-gray-200"}`}>
            <div className="flex gap-3 items-center h-10">
                <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
                    <PiBrainBold className="text-white text-xl" />
                </div>
                <div className="hidden md:block">
                    <h5 className="text-l font-bold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">LearnVault AI</h5>
                    <p className={`text-xs ${darkMode?"text-gray-300":"text-gray-600"}`}>AI Learning Workspace</p>
                </div>
            </div>

            <div className=" mt-2 border-t-2 border-gray-700"></div>
            
            <div className="flex-1 mt-6">
                <div className="flex items-center gap-2 px-2">
                    <HiOutlineCollection className="text-purple-300 text-xl"/>
                    <h3 className="hidden md:block text-sm font-semibold text-gray-400 uppercase tracking-wider">
                        Topics
                    </h3>
                </div>
                <div className="overflow-y-auto mt-3 flex flex-col gap-2">
                    {
                        topics.length>0 ? (
                            <div className="mt-2 flex flex-col gap-0.5">
                                {topics.map((topic,index)=>(
                                    <div
                                        key={index}
                                        className={`
                                        p-1
                                        rounded-md
                                        hover:bg-purple-500/20
                                        cursor-pointer
                                        ${darkMode ? "text-gray-300" : "text-black"}
                                        `}
                                        onClick={()=>navigate(`/topic/${topic.name}`)}
                                    >{topic.name}</div>
                                ))}
                            </div>
                        ) : (
                            <p className={`mt-2 px-2 text-md ${darkMode ? "text-gray-500" : "text-gray-700"}`}>
                                Start a conversation to generate topics
                            </p>
                        )
                    } 
                </div>
                
            </div>

            <div className=" mt-2 border-t-2 border-gray-700"></div>

            <div className="relative">
                 <div className="flex items-center gap-2 p-2 rounded-xl cursor-pointer hover:bg-white/10 transition-all">
                    <FaUserCircle onClick={()=>setShowMenu(!showMenu)} className="text-2xl text-purple-300"/>
                    <h4 className={`hidden md:block text-sm font-semibold ${darkMode ? "text-white" : "text-black"}`}>
                        {user.name||"User"}    
                    </h4>  
                </div>
                {
                    showMenu && (<div className={`absolute bottom-16 left-0 w-max rounded-xl border border-purple-500/30 p-2 shadow-lg shadow-purple-500/20 backdrop-blur-md flex-shrink-0 ${darkMode ? "bg-slate-900" : "bg-white"}`}>
                        <div
                            onClick={()=>setDarkMode(prev=>!prev)}
                            className={`
                            flex
                            items-center
                            gap-2
                            p-2
                            rounded-lg
                            cursor-pointer
                            whitespace-nowrap
                            ${
                            darkMode
                            ? "text-gray-100 hover:bg-purple-500/20 hover:text-purple-200"
                            : "text-black hover:bg-gray-200"
                            }`}>
                            <MdDarkMode/>
                            <span>
                                {darkMode ? "Light Mode" : "Dark Mode"}
                            </span>
                        </div>

                        <div className={`
                            flex
                            items-center
                            gap-2
                            p-2
                            hover:bg-red-500/20
                            hover:text-red-300
                            rounded-lg
                            cursor-pointer
                            whitespace-nowrap
                            ${darkMode?"text-gray-100":"text-black"}
                            `} onClick={handleLogout}>
                                <IoLogOutOutline/>
                                <span>Logout</span>
                        </div>
                    </div>)
                }
            </div>
           
        </div>
    )
}

export default Sidebar