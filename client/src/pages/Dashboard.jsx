import Sidebar from "../components/Sidebar"
import Chat from "../components/Chat"
function Dashboard({topics,setTopics,pinnedChats,setPinnedChats,notes,setNotes}){
    return(
        <div className="flex h-screen overflow-hidden bg-slate-950">
            <Sidebar topics={topics}/>    
            <Chat topics={topics} setTopics={setTopics} pinnedChats={pinnedChats} notes={notes}
            />
        </div>
    )
}

export default Dashboard