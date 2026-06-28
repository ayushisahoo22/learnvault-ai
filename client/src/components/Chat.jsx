import {FaSearch } from "react-icons/fa";
import { IoSettingsOutline,IoCloseOutline,IoSend } from 'react-icons/io5';
import { useState } from "react";
import { BsPinAngleFill, BsJournalText } from 'react-icons/bs';
import Panel from "./Panel";
function Chat(){
    const [messages,setMessages] = useState([]);
    return(
        <>
            <div className="flex-1 flex flex-col bg-slate-950 min-h-screen overflow-hidden relative p-4 md:p-6">
                <Panel/>
                    <div className="flex-1 flex items-center justify-center overflow-hidden">
                        {messages.length===0?(
                            <div className="text-center px-4 mb-32">
                                <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                                    LearnVault AI
                                </h1>
                                <p className="mt-5 text-xl md:text-3xl font-semibold text-white">What do you want to learn today?</p>
                                <p className="mt-3 text-gray-400 max-w-xl mx-auto">
                                    Explore concepts,generate notes,and build understanding with AI.
                                </p>
                            </div>
                        ):(
                            <div className="flex-1 overflow-y-auto p-4 w-full">
                                {messages.map((msg,index)=>(
                                    <div key={index}>
                                        {msg.text}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                <div className="flex justify-center pb-4">
                    <div className="flex items-center gap-3 p-3 rounded-2xl w-full md:w-[80%] lg:w-[65%] bg-slate-900 border border-purple-500/20 shadow-lg shadow-purple-500/5">
                        <input type="text" placeholder="Ask anything" className="flex-1 bg-transparent outline-none text-white placeholder-gray-500" />
                        <button className="p-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white">
                            <IoSend/>
                        </button>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Chat;
