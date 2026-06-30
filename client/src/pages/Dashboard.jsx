import Sidebar from "../components/Sidebar"
import Chat from "../components/Chat"
function Dashboard({topics,setTopics}){
    return(
        <div className="flex h-screen overflow-hidden bg-slate-950">
            <Sidebar topics={topics}/>    
            <Chat topics={topics} setTopics={setTopics}/>
        </div>
    )
}

export default Dashboard