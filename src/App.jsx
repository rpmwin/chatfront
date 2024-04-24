import { useState } from "react";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Dummy from "./pages/Dummy";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="w-[120vw] min-h-screen h-[120vh] sm:h-screen sm:w-screen bg-slate-900 text-3xl flex justify-center items-center text-white flex-col relative ">
            <div className="scale-75  text-center">
                <BrowserRouter>
                    <div>
                        <Navbar />
                    </div>

                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/signup" element={<Signup />}></Route>
                        <Route path="/chat" element={<Chat />}></Route>
                        <Route path="/dummy" element={<Dummy />}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
