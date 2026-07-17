import {FaSearch } from "react-icons/fa";
import { IoSettingsOutline,IoCloseOutline,IoSend } from 'react-icons/io5';
import { useState } from "react";
import { BsPinAngleFill, BsJournalText } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import API from "../api/chatApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Panel({setIsNewChat,setInput,setCurrentConversationId,setDarkMode,darkMode,topics,search,setSearch,fetchChats}){
    const [showPanel,setShowPanel]=useState(false);
    const [activeTab,setActiveTab]=useState("pinned");
    const [selectedNote,setSelectedNote]= useState(null);
    const pinnedConversations = topics
    ?.flatMap(topic =>
        topic.conversations.map(conversation => ({
            ...conversation,
            topicName: topic.name
        }))
    )
    ?.filter(conversation => conversation.isPinned);

    const generatedNotes = topics
    ?.flatMap(topic =>
        topic.conversations.map(conversation => ({
            ...conversation,
            topicName: topic.name
        }))
    )
    ?.filter(conversation => conversation.isNote);

    const navigate=useNavigate();
    const searchResults=topics?.flatMap(topic=>
        topic.conversations.filter(conversation=>
            conversation.title.toLowerCase()
            .includes(search.toLowerCase())

            ||
            conversation.chats.some(chat=>
                chat.text.toLowerCase()
                .includes(search.toLowerCase())
            )
        ).map(conversation=>({
            ...conversation,
            topicName:topic.name
        }))
    )

    const handleNewChat=()=>{
        setIsNewChat?.(true);
        setCurrentConversationId?.(null);
        setInput?.("");
        navigate("/");
    }
    const handlePin = async (conversation) => {
        try {
            await API.patch(`/chat/pin/${conversation.id}`);

            await fetchChats();

        } catch (error) {
            console.log(error);
        }
    };
    const handleDelete=async (conversation)=>{
        try {
            await API.patch(`/chat/note/remove/${conversation.id}`);
            await fetchChats();

        } catch (error) {
            console.log(error);
    console.log(error.response);
    console.log(error.response?.data);
        }
    }
    return(
        <>
            <div className="relative w-full">
                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 px-4 py-2 flex-1 rounded-xl bg-slate-900 border border-purple-500/20 ${darkMode?"bg-slate-900":"bg-white"}`}>
                        <FaSearch className="text-gray-400"/>
                        <input type="text" placeholder="Search Topics..." onChange={(e)=>setSearch(e.target.value)} value={search} className={`w-full bg-transparent outline-none ${darkMode?"text-white placeholder-gray-500":"text-black placeholder-gray-400"}`}/>
                        {
                            search && (<div className={`
                            absolute
                            top-14
                            left-0
                            w-full
                            ${darkMode?"bg-slate-900":"bg-white"}
                            rounded-xl
                            p-2
                            z-50
                            max-h-60
                            overflow-y-auto
                            `}>
                            {
                            searchResults?.length>0 ?
                            searchResults.map(conversation=>(
                                <div
                                key={conversation.id}
                                onClick={()=>{
                                    navigate(`/topic/${conversation.topicName}/${conversation.id}`);
                                    setSearch("");
                                }}
                                className={`
                                p-3
                                rounded-lg
                                hover:bg-purple-500/20
                                cursor-pointer
                                ${darkMode?"text-white":"text-black"}
                                `}>
                                {conversation.title}
                                </div>
                            ))
                            :
                            <p className={`text-gray-450 p-3`}>
                                No results found
                            </p>
                            }
                            </div>
                            )}
                    </div>
                    <button className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white shrink-0" onClick={handleNewChat}>+ New Chat</button>
                    <button className="p-2 rounded-lg hover:bg-purple-500/20 text-purple-300 shrink-0" onClick={()=>setShowPanel(!showPanel)}>
                        <IoSettingsOutline/>
                    </button>
                </div>

                {
                    showPanel && (<div className={`absolute top-0 right-0 h-screen w-full sm:w-80 border-l border-purple-500/20 shadow-2xl shadow-purple-500/10 p-5 z-50 flex flex-col ${darkMode?"bg-slate-900":"bg-gray-100"}`}>
                            <div className={`flex justify-between items-center pb-4 ${darkMode ? "border-b border-white/10" : "border-b border-gray-300"}`}>
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
                                        : darkMode
                                        ? "bg-slate-800 text-gray-400"
                                        : "bg-white text-black border border-gray-300"
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
                                        : darkMode
                                        ? "bg-slate-800 text-gray-400"
                                        : "bg-white text-black border border-gray-300"
                                    }
                                    `}>
                                    <BsJournalText/>
                                    Notes
                                </button>
                            </div>
                            <div className="mt-4 flex-1 overflow-y-auto pr-2">{
                                activeTab==="pinned"?(
                                    pinnedConversations?.length>0?(
                                        <div>
                                            {pinnedConversations.map((chat,index)=>(
                                                <div key={index} onClick={() =>navigate(`/topic/${chat.topicName}/${chat.id}`)}className={`flex justify-between p-3 rounded-xl mb-2 ${darkMode?"bg-slate-800 text-gray-200":"bg-white text-black border"}`}>
                                                    {chat.title}
                                                    <button
                                                    title="Unpin Chat"
                                                    onClick={(e)=>{
                                                        e.stopPropagation();
                                                        handlePin(chat);
                                                    }}
                                                    >
                                                        <BsPinAngleFill
                                                        className="
                                                        text-purple-400
                                                        hover:text-purple-300
                                                        "
                                                        />
                                                    </button>
                                                </div>
                                            ))}
                                            
                                        </div>
                                    ):(
                                        <div className="h-full flex items-center justify-center">
                                            <p className="text-gray-500">
                                                No pinned chats yet
                                            </p>
                                        </div>
                                    )):(
                                        generatedNotes?.length>0?(
                                            <div>
                                                {generatedNotes.map((note,index)=>(
                                                    <div key={index} onClick={() =>setSelectedNote(note)} className={`flex justify-between p-3 rounded-xl mb-2 ${darkMode?"bg-slate-800 text-gray-200":"bg-white text-black border"}`}>
                                                        {note.title}
                                                        <button
                                                            title="Delete Notes"
                                                            onClick={(e)=>{
                                                                e.stopPropagation();
                                                                handleDelete(note);
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
                                                ))}
                                            </div>
                                        ):(
                                            <div className="h-full flex items-center justify-center">
                                                <p className="text-gray-500">
                                                    No pinned chats yet
                                                </p>
                                            </div>
                                        )
                                    )}
                            </div>
                        </div>
                    )
                }

                {
                    selectedNote && (
                        <div
                            className="
                            fixed
                            inset-0
                            bg-black/50
                            flex
                            justify-center
                            items-center
                            z-50
                            "
                        >

                            <div
                                className="
                                bg-slate-900
                                text-white
                                w-[80%]
                                h-[80%]
                                rounded-xl
                                p-6
                                overflow-y-auto
                                "
                            >

                                <button
                                    onClick={() => setSelectedNote(null)}
                                    className="
                                    bg-red-500
                                    px-3
                                    py-1
                                    rounded
                                    mb-4
                                    "
                                >
                                    Close
                                </button>

                                <h2 className="text-2xl font-bold mb-4">
                                    {selectedNote.title}
                                </h2>

                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {selectedNote.notes}
                                </ReactMarkdown>

                            </div>

                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Panel

