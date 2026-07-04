import {BrowserRouter,Routes,Route} from "react-router-dom"
import Dashboard from './pages/Dashboard'
import TopicPage from "./pages/TopicPage";
import { useState } from "react";
function App() {
    const [topics,setTopics] = useState([]);
    const [pinnedChats,setPinnedChats]=useState([]);
    const [notes,setNotes]=useState([]);
    const [darkMode,setDarkMode]=useState(true);
    return(
        <div className={
            darkMode
            ? "bg-slate-950 text-white"
            : "bg-gray-100 text-black"
        }>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard
                        topics={topics}
                        setTopics={setTopics}
                        pinnedChats={pinnedChats}
                        setPinnedChats={setPinnedChats}
                        notes={notes}
                        setNotes={setNotes}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                    />
                }/>
                    <Route path="/topic/:name" element={<TopicPage
                        topics={topics}
                        setTopics={setTopics}
                        pinnedChats={pinnedChats}
                        setPinnedChats={setPinnedChats}
                        notes={notes}
                        setNotes={setNotes}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                    />
                    }/>
                    <Route
                        path="/topic/:name/:conversationId"
                        element={
                            <TopicPage
                                topics={topics}
                                setTopics={setTopics}
                                darkMode={darkMode}
                                setDarkMode={setDarkMode}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
