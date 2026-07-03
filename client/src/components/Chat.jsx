import {FaSearch } from "react-icons/fa";
import { IoSettingsOutline,IoCloseOutline,IoSend } from 'react-icons/io5';
import { useState } from "react";
import { BsPinAngleFill, BsJournalText } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import Panel from "./Panel";
function Chat({topics,setTopics,pinnedChats,notes}){
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
    const [currentConversationId,setCurrentConversationId]=useState(null);
    const[isNewChat,setIsNewChat]=useState(true);
    
    const currentConversation = topics
    ?.flatMap(topic=>topic.conversations)
    ?.find(
        conversation =>
        conversation.id===currentConversationId
    );
    const handleSend=()=>{

        if(!input.trim()) return;

        setIsNewChat(false);

        const detectedTopic=detectTopic(input);

        const userMessage={
            sender:"user",
            text:input
        };

        const aiMessage={
            sender:"ai",
            text:`I am helping you learn about ${detectedTopic}`
        };

        const newConversation={
            id:Date.now(),
            title:input,
            chats:[
                userMessage,
                aiMessage
            ]
        };

        let activeId=currentConversationId;

        // First message after clicking New Chat
        if(!activeId){
            activeId=newConversation.id;
            setCurrentConversationId(activeId);
        }

        setTopics(prev=>{

            let conversationFound=false;

            const updatedTopics=prev.map(topic=>{

                const exists=topic.conversations?.some(
                    conversation=>conversation.id===activeId
                );

                if(exists){

                    conversationFound=true;

                    return{
                        ...topic,
                        conversations:
                        topic.conversations.map(
                            conversation=>

                            conversation.id===activeId
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
                    };
                }

                return topic;
            });

            // New conversation
            if(!conversationFound){

                const existingTopic=
                updatedTopics.find(
                    topic=>topic.name===detectedTopic
                );

                if(existingTopic){

                    return updatedTopics.map(topic=>

                        topic.name===detectedTopic
                        ?{
                            ...topic,
                            conversations:[
                                ...topic.conversations,
                                newConversation
                            ]
                        }
                        :topic
                    );
                }

                return[
                    ...updatedTopics,
                    {
                        name:detectedTopic,
                        conversations:[
                            newConversation
                        ]
                    }
                ];
            }

            return updatedTopics;

        });

        setInput("");
    }
    return(
        <>
            <div className="flex-1 flex flex-col bg-slate-950 p-6 h-full overflow-hidden">
                <Panel setIsNewChat={setIsNewChat} setInput={setInput} setCurrentConversationId={setCurrentConversationId} pinnedChats={pinnedChats} notes={notes}/>
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
                                <p className="mt-5 text-xl md:text-3xl font-semibold text-white">What do you want to learn today?</p>
                                <p className="mt-3 text-gray-400 max-w-xl mx-auto">
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
