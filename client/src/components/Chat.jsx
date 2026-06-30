import {FaSearch } from "react-icons/fa";
import { IoSettingsOutline,IoCloseOutline,IoSend } from 'react-icons/io5';
import { useState } from "react";
import { BsPinAngleFill, BsJournalText } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import Panel from "./Panel";
function Chat({topics,setTopics}){
    const detectTopic=(text)=>{

        text=text.toLowerCase();

        if(
            text.includes("array") ||
            text.includes("tree") ||
            text.includes("binary") ||
            text.includes("linked list") ||
            text.includes("graph")
        ){
            return "dsa";
        }

        if(
            text.includes("react") ||
            text.includes("hook") ||
            text.includes("component")
        ){
            return "react";
        }

        if(
            text.includes("html") ||
            text.includes("css") ||
            text.includes("api") ||
            text.includes("javascript")
        ){
            return "web";
        }

        return "general";
    }
    const navigate=useNavigate();
    const [input,setInput] = useState("");
    const[isNewChat,setIsNewChat]=useState(true);
    const handleSend = ()=>{
        if(!input.trim()) return;
        setIsNewChat(false);
        const detectedTopic=detectTopic(input);
        setTopics(prev=>{
            const existingTopic= prev.find(topic=>topic.name===detectedTopic);
            if(existingTopic){
                return prev.map((topic)=>(
                    topic.name===detectedTopic?{
                        ...topic,
                        chats:[
                            ...topic.chats,
                            {
                                sender:"user",
                                text:input
                            }
                        ]
                    }:topic
                ))
            }

            return [
                ...prev,
                {
                    name:detectedTopic,
                    chats:[
                        {
                            sender:"user",
                            text:input
                        }
                    ]
                }
            ]
        })
        setInput("")
    }
    return(
        <>
            <div className="flex-1 flex flex-col bg-slate-950 p-6 h-full overflow-hidden">
                <Panel setIsNewChat={setIsNewChat} setInput={setInput}/>
                    <div className="flex-1 flex items-center justify-center overflow-hidden">
                        { isNewChat || topics?.length===0?(
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
                                {topics?.map((topic,index)=>(
                                    <div key={index}
                                    className="
                                        max-w-[70%]
                                        self-end
                                        p-3
                                        rounded-2xl
                                        bg-purple-600
                                        text-white
                                        " onClick={()=>navigate(`/topics/${topic.name}`)}>
                                        {topic.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                <div className="flex justify-center pb-4">
                    <div className="flex items-center gap-3 p-3 rounded-2xl w-full md:w-[80%] lg:w-[65%] bg-slate-900 border border-purple-500/20 shadow-lg shadow-purple-500/5">
                        <input type="text" value={input} placeholder="Ask anything" 
                            onChange={(e)=>setInput(e.target.value)}
                            onKeyDown={(e)=>{
                                if(e.key==="Enter"){
                                    handleSend();
                                }
                            }}
                            className="flex-1 bg-transparent outline-none text-white placeholder-gray-500" />
                        <button onClick={handleSend} className="p-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white">
                            <IoSend/>
                        </button>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Chat;
