import Sidebar from "../components/Sidebar"
import Chat from "../components/Chat"
function Dashboard({topics,setTopics,pinnedChats,notes,setPinnedChats,setNotes,darkMode,setDarkMode,search,setSearch,fetchChats}){
    return(
        <div className="flex h-screen overflow-hidden bg-slate-950">
            <Sidebar topics={topics} darkMode={darkMode} setDarkMode={setDarkMode}/>    
            <Chat topics={topics} setTopics={setTopics} notes={notes}
            darkMode={darkMode} setDarkMode={setDarkMode} setNotes={setNotes} search={search} setSearch={setSearch}
            fetchChats={fetchChats}/>
        </div>
    )
}

export default Dashboard