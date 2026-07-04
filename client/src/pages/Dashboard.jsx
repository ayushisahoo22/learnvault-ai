import Sidebar from "../components/Sidebar"
import Chat from "../components/Chat"
function Dashboard({topics,setTopics,pinnedChats,notes,setPinnedChats,setNotes,darkMode,setDarkMode,search,setSearch}){
    return(
        <div className="flex h-screen overflow-hidden bg-slate-950">
            <Sidebar topics={topics} darkMode={darkMode} setDarkMode={setDarkMode}/>    
            <Chat topics={topics} setTopics={setTopics} pinnedChats={pinnedChats} notes={notes}
            darkMode={darkMode} setDarkMode={setDarkMode} setPinnedChats={setPinnedChats} setNotes={setNotes} search={search} setSearch={setSearch}
            />
        </div>
    )
}

export default Dashboard