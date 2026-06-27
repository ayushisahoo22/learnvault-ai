import { PiBrainBold } from "react-icons/pi";
import { HiOutlineCollection } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { useState } from "react";
function Sidebar(){
    const topics=[]
    const [showMenu,setShowMenu] = useState(false);
    return(
        <div className="flex flex-col h-screen w-1/4 md:w-64 lg:w-72 bg-gradient-to-b from-slate-950 to-indigo-950 p-5">
            <div className="flex gap-3 items-center h-10">
                <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
                    <PiBrainBold className="text-white text-xl" />
                </div>
                <div className="hidden md:block">
                    <h5 className="text-l font-bold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">LearnVault AI</h5>
                    <p className="text-xs text-gray-300">AI Learning Workspace</p>
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
                                        className="
                                        p-1
                                        rounded-md
                                        hover:bg-purple-500/20
                                        cursor-pointer
                                        text-gray-300"
                                    >{topic}</div>
                                ))}
                            </div>
                        ) : (
                            <p className="mt-2 px-2 text-md text-gray-500">
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
                    <h4 className="hidden md:block text-sm font-semibold text-white">Ayushi</h4>  
                </div>
                {
                    showMenu && (<div className="absolute bottom-16 w-full rounded-xl bg-slate-900 border border-purple-500/30 p-2 shadow-lg shadow-purple-500/20 backdrop-blur-md">
                        <div className="
                            flex
                            items-center
                            gap-2
                            p-2
                            text-gray-100
                            hover:bg-purple-500/20
                            hover:text-purple-200
                            rounded-lg
                            cursor-pointer
                            ">
                                <MdDarkMode/>
                                <span>Change Theme</span>
                        </div>

                        <div className="
                            flex
                            items-center
                            gap-2
                            p-2
                            text-gray-100
                            hover:bg-red-500/20
                            hover:text-red-300
                            rounded-lg
                            cursor-pointer
                            ">
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