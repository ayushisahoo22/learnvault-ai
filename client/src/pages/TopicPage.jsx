import Sidebar from "../components/Sidebar"
import Panel from "../components/Panel"
import {FaSearch } from "react-icons/fa";
import { useParams,useNavigate } from "react-router-dom"
import {IoSend } from 'react-icons/io5'
import Chat from "../components/Chat";
import { useState } from "react";
function TopicPage({topics,setTopics}){
    const {name,conversationId}=useParams();
    const navigate=useNavigate();
    const [input,setInput]=useState("");
    const selectedTopic= topics.find(topic=>topic.name === name);
    const selectedConversation=selectedTopic?.conversations?.find(conversation=>conversation.id===Number(conversationId));
    const handleContinueChat=()=>{
        if(!input.trim()) return;
        const userMessage={
            sender:"user",
            text:input
        };
        const aiMessage={
            sender:"ai",
            text:`I am helping you learn about ${name}`
        };
        setTopics(prev=>
            prev.map(topic=>
                topic.name===name
                ?{
                    ...topic,
                    conversations:
                    topic.conversations.map(
                        conversation=>
                        conversation.id===Number(conversationId)
                        ?{
                            ...conversation,
                            chats:[
                                ...conversation.chats,
                                userMessage,
                                aiMessage
                            ]
                        }
                        :conversation
                    )
                }
                :topic
            )
        );
        setInput("");
    }
    return (
        <div className="flex min-h-screen bg-slate-950">

            <Sidebar topics={topics}/>
            <div className="flex-1 p-6 flex flex-col h-screen overflow-hidden">
                <Panel/>
                <div className="mt-10">
                    <h1 className="
                    text-4xl
                    font-bold
                    text-transparent
                    bg-clip-text
                    p-2
                    bg-gradient-to-r
                    from-purple-400
                    to-cyan-300
                    ">
                        {name}
                    </h1>
                </div >

                <div className="
                flex-1
                overflow-y-auto
                mt-1
                flex
                flex-col
                gap-3
                ">
                    {
                    !conversationId ? (
                        <div className="mt-6 flex flex-col gap-4">
                            {
                                selectedTopic?.conversations?.map(
                                    (conversation)=>(
                                    <div
                                        key={conversation.id}
                                        onClick={()=>
                                            navigate(
                                            `/topic/${name}/${conversation.id}`
                                            )
                                        }
                                        className="
                                        p-4
                                        rounded-xl
                                        bg-slate-800
                                        hover:bg-slate-700
                                        cursor-pointer
                                        text-white
                                        "
                                    >
                                        {conversation.title}
                                    </div>

                                ))
                            }
                        </div>

                    ):(
                        <div className="
                            flex
                            flex-col
                            h-screen
                            overflow-hidden
                            ">
                                <div
                                className="
                                flex-1
                                overflow-y-auto
                                min-h-0
                                mt-1
                                flex
                                flex-col
                                gap-6
                                ">
                                    <h4 className="text-xl font-bold text-purple-300">
                                        {selectedConversation.title}
                                    </h4>
                                    {
                                        selectedConversation?.chats?.map(
                                            (chat,index)=>(
                                            <div
                                                key={index}
                                                className={`
                                                flex
                                                ${
                                                    chat.sender==="user"
                                                    ?"justify-end"
                                                    :"justify-start"
                                                }
                                                `}
                                            >

                                            <div
                                                className={`
                                                p-3
                                                rounded-xl
                                                max-w-[70%]

                                                ${
                                                    chat.sender==="user"
                                                    ?"bg-purple-600 text-white"
                                                    :"bg-slate-800 text-gray-200"
                                                }
                                                `}
                                            >
                                                {chat.text}
                                            </div>
                                        </div>
                                    ))
                                }
                                </div>
                                <div className="flex justify-center pt-4 border-t bg-slate-950 z-10">
                                    <div className="flex items-center gap-3 p-3 rounded-2xl w-full md:w-[80%] lg:w-[65%] bg-slate-900 border border-purple-500/20 shadow-lg shadow-purple-500/5">
                                        <input type="text" value={input} placeholder="Ask anything" 
                                            onChange={(e)=>setInput(e.target.value)}
                                            onKeyDown={(e)=>{
                                                if(e.key==="Enter"){
                                                    handleContinueChat();
                                                }
                                            }}
                                            className="flex-1 bg-transparent outline-none text-white placeholder-gray-500" />
                                        <button onClick={handleContinueChat} className="p-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white">
                                            <IoSend/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default TopicPage