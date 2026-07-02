import {BrowserRouter,Routes,Route} from "react-router-dom"
import Dashboard from './pages/Dashboard'
import TopicPage from "./pages/TopicPage";
import { useState } from "react";
function App() {
    const [topics,setTopics] = useState([]);
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard
                    topics={topics}
                    setTopics={setTopics}
                />
            }/>
                <Route path="/topic/:name" element={<TopicPage
                    topics={topics}
                />
                }/>
                <Route
                    path="/topic/:name/:conversationId"
                    element={
                        <TopicPage
                            topics={topics}
                            setTopics={setTopics}
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
