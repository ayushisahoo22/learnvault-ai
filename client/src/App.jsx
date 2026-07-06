import {BrowserRouter,Routes,Route} from "react-router-dom"
import Dashboard from './pages/Dashboard'
import TopicPage from "./pages/TopicPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";
function App() {
    const [topics,setTopics] = useState([]);
    const [pinnedChats,setPinnedChats]=useState([]);
    const [notes,setNotes]=useState([]);
    const [darkMode,setDarkMode]=useState(true);
    const[search,setSearch]=useState("");
    return(
        <div className={
            darkMode
            ? "bg-slate-950 text-white"
            : "bg-gray-100 text-black"
        }>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/" element={
                        <ProtectedRoute>
                            <Dashboard
                            topics={topics}
                            setTopics={setTopics}
                            pinnedChats={pinnedChats}
                            setPinnedChats={setPinnedChats}
                            notes={notes}
                            setNotes={setNotes}
                            darkMode={darkMode}
                            setDarkMode={setDarkMode}
                            search={search}
                            setSearch={setSearch}
                        />
                    </ProtectedRoute>    
                }/>
                    <Route path="/topic/:name" element={
                        <ProtectedRoute>
                            <TopicPage
                            topics={topics}
                            setTopics={setTopics}
                            pinnedChats={pinnedChats}
                            setPinnedChats={setPinnedChats}
                            notes={notes}
                            setNotes={setNotes}
                            darkMode={darkMode}
                            setDarkMode={setDarkMode}
                            search={search}
                            setSearch={setSearch}
                            />
                        </ProtectedRoute>
                    }/>
                    <Route
                        path="/topic/:name/:conversationId"
                        element={
                            <ProtectedRoute>
                            <TopicPage
                                topics={topics}
                                setTopics={setTopics}
                                darkMode={darkMode}
                                setDarkMode={setDarkMode}
                                search={search}
                                setSearch={setSearch}
                            />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
