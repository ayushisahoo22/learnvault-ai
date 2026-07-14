import {FaSearch } from "react-icons/fa";
import { IoSettingsOutline,IoCloseOutline,IoSend } from 'react-icons/io5';
import { useState,useEffect } from "react";
import { BsPinAngleFill, BsJournalText } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import Panel from "./Panel";
import API from "../api/chatApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Chat({topics,setTopics,pinnedChats,notes,setPinnedChats,setNotes,darkMode,setDarkMode,search,setSearch,fetchChats}){
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
    const [loading, setLoading] = useState(false);
    const [input,setInput] = useState("");
    const [currentConversationId,setCurrentConversationId]=useState(null);
    const[isNewChat,setIsNewChat]=useState(true);
    useEffect(() => {
        fetchChats();
    }, []);
    const currentConversation = topics
    ?.flatMap(topic=>topic.conversations)
    ?.find(
        conversation =>
        conversation.id===currentConversationId
    );
    const handleSend=async()=>{
        if (!input.trim()) return;
        setIsNewChat(false);
        const detectedTopic = detectTopic(input);
        try {
            // New Chat
            if (!currentConversationId) {
                setLoading(true);
                const response = await API.post("/chat/create", {
                    topic: detectedTopic,
                    title: input,
                    message: input
                });
                const createdChat = response.data.chat;
                setCurrentConversationId(createdChat._id);
                await fetchChats();
            }
            // Existing Chat
            else {
                await API.patch(`/chat/${currentConversationId}`, {
                    message:input
                });

            }
            setInput("");
            await fetchChats();
        }
        catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false)
        }
    }
    return(
        <>
            <div className={`flex-1 flex flex-col ${darkMode?"bg-slate-950":"bg-gray-100"} transition-all duration-300 p-6 h-full overflow-hidden`}>
                <Panel setIsNewChat={setIsNewChat} setInput={setInput} setCurrentConversationId={setCurrentConversationId} pinnedChats={pinnedChats} notes={notes}
                setPinnedChats={setPinnedChats} setNotes={setNotes} setDarkMode={setDarkMode} darkMode={darkMode} topics={topics} search={search} setSearch={setSearch}/>
                    <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
                        { isNewChat || topics?.length===0?(
                            <div className="flex-1
                                    flex
                                    flex-col
                                    justify-center
                                    items-center
                                    text-center
                                    px-4
                                    mb-32
                                    ">
                                <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                                    LearnVault AI
                                </h1>
                                <p className={`mt-5 text-xl md:text-3xl font-semibold ${darkMode?"text-white":"text-black"}`}>What do you want to learn today?</p>
                                <p className={`mt-3 ${darkMode?"text-gray-400":"text-gray-600"} max-w-xl mx-auto`}>
                                    Explore concepts,generate notes,and build understanding with AI.
                                </p>
                            </div>
                        ):(
                            <div className="flex-1
                                min-h-0
                                overflow-y-auto
                                p-4
                                w-full
                                flex
                                flex-col
                                gap-4">
                                {
                                    currentConversation?.chats?.map(
                                        (chat,index)=>(

                                            <div
                                                key={index}
                                                className={`
                                                flex mb-4
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
                                                    rounded-2xl
                                                    max-w-[70%]
                                                    ${
                                                        chat.sender==="user"
                                                        ?"bg-purple-600 text-white"
                                                        :darkMode?"bg-slate-800 text-gray-200":"bg-white text-black border"
                                                    }
                                                    `}
                                                >
                                                    {
                                                        chat.sender === "ai" ? (
                                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                                {chat.text}
                                                            </ReactMarkdown>
                                                        ) : (
                                                            chat.text
                                                        )
                                                    }
                                                </div>
                                            </div>

                                    ))
                                }
                            </div>
                        )}
                    </div>

                <div className="flex justify-center pb-4">
                    <div className={`flex items-center gap-3 p-3 rounded-2xl w-full md:w-[80%] lg:w-[65%] border border-purple-500/20 shadow-lg shadow-purple-500/5 ${darkMode?"bg-slate-800":"bg-white"}`}>
                        <input type="text" value={input} placeholder="Ask anything" 
                            onChange={(e)=>setInput(e.target.value)}
                            onKeyDown={(e)=>{
                                if(e.key==="Enter"){
                                    handleSend();
                                }
                            }}
                            className={`flex-1 bg-transparent outline-none placeholder-gray-500 ${darkMode?"text-white":"text-black"}`}/>
                        <button onClick={handleSend} disabled={loading} className="p-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white">
                            {
                                loading
                                ? "Thinking..."
                                : <IoSend/>
                            }
                        </button>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Chat
