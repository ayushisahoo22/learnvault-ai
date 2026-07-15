import Sidebar from "../components/Sidebar"
import Panel from "../components/Panel"
import {FaSearch } from "react-icons/fa";
import { useParams,useNavigate } from "react-router-dom"
import {IoSend } from 'react-icons/io5'
import Chat from "../components/Chat";
import { useState,useEffect } from "react";
import { BsPinAngleFill, BsJournalText } from 'react-icons/bs';
import { MdDeleteOutline } from "react-icons/md";
import API from "../api/chatApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function TopicPage({topics,setTopics,darkMode,setDarkMode,search,setSearch,fetchChats}){
    const {name,conversationId}=useParams();
    const navigate=useNavigate();
    const [input,setInput]=useState("");
    const selectedTopic= topics.find(topic=>topic.name === name);
    const selectedConversation = selectedTopic?.conversations?.find(
        conversation => conversation.id === conversationId
    );
    useEffect(() => {
        fetchChats();
    }, []);
    const [loading, setLoading] = useState(false);
    const handlePin = async (conversation) => {
        try {
            await API.patch(`/chat/pin/${conversation.id}`);
            await fetchChats();
        } catch (error) {
            console.log(error);
        }
    };
    const handleNotes=async(conversation)=>{
        try {
            await API.patch(`/chat/note/${conversation.id}`);
            await fetchChats();
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleDelete=async(conversationId)=>{
        const confirmDelete = window.confirm(
            "Do you want to delete this chat?"
        );
        if (!confirmDelete) return;
        try {
            await API.delete(`/chat/${conversationId}`);
            await fetchChats();
            navigate(`/topic/${name}`);
        } catch (error) {
            console.log(error);
        }
    }

    const handleContinueChat=async()=>{
        if (!input.trim()) return;
        try {
            setLoading(true)
            await API.patch(`/chat/${conversationId}`, {
                message:input
            });
            setInput("");
            await fetchChats();
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false)
        }
    }
    return (
        <div className={`flex min-h-screen ${darkMode?"bg-slate-950":"bg-gray-100"}`}>

            <Sidebar topics={topics} darkMode={darkMode} setDarkMode={setDarkMode}/>
            <div className="flex-1 p-6 flex flex-col h-screen overflow-hidden">
                <Panel darkMode={darkMode} setDarkMode={setDarkMode}
                search={search} setSearch={setSearch} topics={topics} fetchChats={fetchChats}/>
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
                                        key={conversation.id}className={`
                                            p-4
                                            rounded-xl
                                            cursor-pointer
                                            group
                                            flex
                                            justify-between
                                            items-center

                                            ${
                                            darkMode
                                            ? "bg-slate-800 hover:bg-slate-700 text-white"
                                            : "bg-white hover:bg-gray-200 text-black border"
                                            }
                                        `}
                                    >
                                        <span onClick={()=>navigate(`/topic/${name}/${conversation.id}`)}>
                                            {conversation.title}
                                        </span>
                                        <div className="flex gap-4 opacity-0 group-hover:opacity-100 transitiona-all">
                                            <button
                                                title="Pin Chat"
                                                onClick={(e)=>{
                                                    e.stopPropagation();
                                                    handlePin(conversation);
                                                }}
                                                >
                                                    <BsPinAngleFill
                                                    className="
                                                    text-purple-400
                                                    hover:text-purple-300
                                                    "
                                                    />
                                                </button>

                                                <button
                                                title="Generate Notes"
                                                onClick={(e)=>{
                                                    e.stopPropagation();
                                                    handleNotes(conversation);
                                                }}
                                                >
                                                    <BsJournalText
                                                    className="
                                                    text-cyan-400
                                                    hover:text-cyan-300
                                                    "
                                                    />
                                                </button>
                                                <button
                                                    title="Delete Chat"
                                                    onClick={(e)=>{
                                                        e.stopPropagation();
                                                        handleDelete(
                                                            conversation.id
                                                        );
                                                    }}
                                                >
                                                    <MdDeleteOutline
                                                        size={18}
                                                        className="
                                                        text-red-400
                                                        hover:text-red-300
                                                        "
                                                    />
                                                </button>
                                        </div>
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
                                        {selectedConversation?.title}
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
                                                    chat?.sender==="user"
                                                    ?"bg-purple-600 text-white"
                                                    :
                                                    darkMode
                                                    ?"bg-slate-800 text-gray-200"
                                                    :"bg-white text-black border"
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
                                <div className={`flex justify-center pt-4 z-10 ${darkMode?"bg-slate-950":"bg-gray-100"}`}>
                                    <div className={`flex items-center gap-3 p-3 rounded-2xl w-full md:w-[80%] lg:w-[65%] border border-purple-500/20 shadow-lg shadow-purple-500/5 ${darkMode?"bg-slate-950":"bg-white"}`}>
                                        <input type="text" value={input} placeholder="Ask anything" 
                                            onChange={(e)=>setInput(e.target.value)}
                                            disabled={loading}
                                            onKeyDown={(e)=>{
                                                if(e.key==="Enter"){
                                                    handleContinueChat();
                                                }
                                            }}
                                            className={`flex-1 bg-transparent outline-none placeholder-gray-500 ${darkMode?"text-white":"text-black"}`} />
                                        <button onClick={handleContinueChat} disabled={loading} className="p-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white">
                                            {
                                                loading
                                                ? "Thinking..."
                                                : <IoSend/>
                                            }
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