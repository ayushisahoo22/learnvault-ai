import Sidebar from "../components/Sidebar"
import Panel from "../components/Panel"
import { useParams } from "react-router-dom"
import Chat from "../components/Chat";
function TopicPage({topics}){
    const {name}=useParams();
    
    const selectedTopic= topics.find(topic=>topic.name === name);
    return (
        <div className="flex min-h-screen bg-slate-950">

            <Sidebar topics={topics}/>
            <div className="flex-1 p-6">
                <Panel/>
                <div className="mt-10">
                    <h1 className="
                    text-4xl
                    font-bold
                    text-transparent
                    bg-clip-text
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
                mt-6
                flex
                flex-col
                gap-3
                "> {
                    selectedTopic?.chats?.length>0?(
                        <div className="mt-6 flex flex-col gap-3">
                            {selectedTopic.chats.map((chat,index)=>(
                                <div
                                    key={index}
                                    className="
                                    p-3
                                    rounded-xl
                                    bg-slate-800
                                    text-gray-200
                                    "
                                >
                                    {chat.text}
                                </div>
                            ))}
                        </div>
                    ):(
                         <p className="text-gray-500 text-center mt-10">
                                No discussion available
                        </p>
                    )
                }
                </div>

            </div>

        </div>
    )
}

export default TopicPage