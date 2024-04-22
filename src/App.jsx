import { useState } from "react";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Dummy from "./pages/Dummy";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="w-screen min-h-screen bg-slate-900 text-3xl flex justify-center items-center text-white">
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/signup" element={<Signup />}></Route>
                    <Route path="/chat" element={<Chat />}></Route>
                    <Route path="/dummy" element={<Dummy />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
