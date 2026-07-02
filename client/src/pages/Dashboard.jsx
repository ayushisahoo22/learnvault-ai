import Sidebar from "../components/Sidebar"
import Chat from "../components/Chat"
function Dashboard({topics,setTopics,selectedConversation,setSelectedConversation}){
    return(
        <div className="flex h-screen overflow-hidden bg-slate-950">
            <Sidebar topics={topics}/>    
            <Chat topics={topics} setTopics={setTopics} selectedConversation={selectedConversation}
                setSelectedConversation={setSelectedConversation}
            />
        </div>
    )
}

export default Dashboard