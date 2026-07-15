import {BrowserRouter,Routes,Route} from "react-router-dom"
import Dashboard from './pages/Dashboard'
import TopicPage from "./pages/TopicPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";
import API from "./api/chatApi";
function App() {
    const [topics,setTopics] = useState([]);
    const [notes,setNotes]=useState([]);
    const [darkMode,setDarkMode]=useState(true);
    const[search,setSearch]=useState("");
    const fetchChats = async () => {
        try {
            const response = await API.get("/chat");
            const chats = response.data;
            const groupedTopics = chats.reduce((acc, chat) => {
                let topic = acc.find(t => t.name === chat.topic);
                if (!topic) {
                    topic = {
                        name: chat.topic,
                        conversations: []
                    };

                    acc.push(topic);
                }
                topic.conversations.push({
                    id: chat._id,
                    title: chat.title,
                    chats: chat.chats,
                    isPinned: chat.isPinned
                });
                return acc;
            }, []);
            setTopics(groupedTopics);
        } catch (error) {
            console.log(error);
        }
    };
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
                            notes={notes}
                            setNotes={setNotes}
                            darkMode={darkMode}
                            setDarkMode={setDarkMode}
                            search={search}
                            setSearch={setSearch}
                            fetchChats={fetchChats}
                        />
                    </ProtectedRoute>    
                }/>
                    <Route path="/topic/:name" element={
                        <ProtectedRoute>
                            <TopicPage
                            topics={topics}
                            setTopics={setTopics}
                            notes={notes}
                            setNotes={setNotes}
                            darkMode={darkMode}
                            setDarkMode={setDarkMode}
                            search={search}
                            setSearch={setSearch}
                            fetchChats={fetchChats}
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
                                fetchChats={fetchChats}
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
