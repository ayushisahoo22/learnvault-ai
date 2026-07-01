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
                    selectedTopic?.conversations?.length > 0 ? (
                        selectedTopic.conversations.map(
                            (conversation,index)=>(
                                <div
                                    key={conversation.id}
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
                            )
                        )
                    ) : (
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