import {FaSearch } from "react-icons/fa";
import { IoSettingsOutline,IoCloseOutline,IoSend } from 'react-icons/io5';
import { useState } from "react";
import { BsPinAngleFill, BsJournalText } from 'react-icons/bs';
function Chat(){
    const [showPanel,setShowPanel]=useState(false);
    const pinnedChats=[];
    const notes=[];
    const [activeTab,setActiveTab]=useState("pinned");
    const [messages,setMessages] = useState([]);
    return(
        <>
            <div className="flex-1 flex flex-col bg-slate-950 p-6 relative">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 px-4 py-2 w-[60%] rounded-xl bg-slate-900 border border-purple-500/20 focus-within:border-purple-500">
                        <FaSearch className="text-gray-400"/>
                        <input type="text" placeholder="Search Topics..." className="w-full bg-transparent outline-none text-white placeholder-gray-500"/>
                    </div>
                    <button className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white whitespace-nowrap shrink-0">+ New Chat</button>
                    <button className="p-2 rounded-lg hover:bg-purple-500/20 text-purple-300" onClick={()=>setShowPanel(!showPanel)}>
                        <IoSettingsOutline className="text-xl"/>
                    </button>
                </div>

                {
                    messages.length===0?(
                        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                                LearnVault AI
                            </h1>
                            <p className="mt-6 text-2xl md:text-3xl font-semibold text-white">What do you want to learn today?</p>
                            <p className="mt-3 text-gray-400 max-w-xl">
                                Explore concepts,generate notes,and build understanding with AI.
                            </p>
                        </div>
                    ):(
                        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                            {messages.map((msg,index)=>(
                                <div key={index}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                    )
                }

                {
                    showPanel && (<div className="absolute top-0 right-0 h-full w-80 bg-slate-900 border-l border-purple-500/20 shadow-2xl shadow-purple-500/10 p-5 z-50 transition-all duration-300">
                            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-cyan-300">
                                    Workspace
                                </h2>
                                <button className="p-2 rounded-lg hover:bg-red-500/20 text-red-300" onClick={()=>setShowPanel(!showPanel)}>
                                    <IoCloseOutline className="text-xl"/>
                                </button>
                            </div>
                            <div className="mt-4 flex justify-between gap-3">
                                <button onClick={()=>setActiveTab("pinned")} className={`
                                    flex items-center gap-2 px-4 py-2 rounded-xl
                                    transition-all
                                    ${
                                        activeTab==="pinned"
                                        ? "bg-purple-600/30 text-white"
                                        : "bg-slate-800 text-gray-400"
                                    }
                                    `}>
                                    <BsPinAngleFill/>
                                    Pinned
                                </button>
                                <button onClick={()=>setActiveTab("notes")} className={`
                                    flex items-center gap-2 px-4 py-2 rounded-xl
                                    transition-all
                                    ${
                                        activeTab==="notes"
                                        ? "bg-purple-600/30 text-white"
                                        : "bg-slate-800 text-gray-400"
                                    }
                                    `}>
                                    <BsJournalText/>
                                    Notes
                                </button>
                            </div>
                            <div className="mt-4 h-[calc(100vh-180px)] overflow-y-auto pr-2">{
                                activeTab==="pinned"?(
                                    pinnedChats.length>0?(
                                        <div>
                                            {pinnedChats.map((chat,index)=>(
                                                <div key={index} className="p-3 rounded-xl bg-slate-800 text-gray-200 mb-2">{chat}</div>
                                            ))}
                                        </div>
                                    ):(
                                        <p className="text-gray-500 text-center mt-8">
                                            No pinned chats yet
                                        </p>
                                    )):(
                                        notes.length>0?(
                                            <div>
                                                {notes.map((note,index)=>(
                                                    <div key={index} className="p-3 rounded-xl bg-slate-800 text-gray-200 mb-2">{note}</div>
                                                ))}
                                            </div>
                                        ):(
                                            <p className="text-gray-500 text-center mt-8">
                                                No saved notes yet
                                            </p>
                                        )
                                    )}
                            </div>
                        </div>
                    )
                }

                <div className="mt-auto flex justify-center pb-4">
                    <div className="flex items-center gap-3 p-3 rounded-2xl w-[85%] md:w-[75%] lg:w-[65%] bg-slate-900 border border-purple-500/20 shadow-lg shadow-purple-500/5">
                        <input type="text" placeholder="Ask anything" className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 px-2" />
                        <button className="p-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition-all hover:scale-105">
                            <IoSend className="text-lg"/>
                        </button>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Chat;
