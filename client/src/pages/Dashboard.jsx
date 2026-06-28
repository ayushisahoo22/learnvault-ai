import Sidebar from "../components/Sidebar"
import Chat from "../components/Chat"
function Dashboard(){
    return(
        <div className="flex h-screen">
            <Sidebar/>    
            <Chat/>
        </div>
    )
}

export default Dashboard