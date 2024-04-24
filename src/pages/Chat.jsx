import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Chat() {
    const socket = useMemo(() => io("https://chatback-ryc1.onrender.com"), []);
    const [allusers, setallusers] = useState([]);
    const [message, setmessage] = useState("");
    const [selectedUser, setSelectedUser] = useState({});
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState({});
    const [token, setToken] = useState(""); // State to store the token

    // Fetch user info when component mounts
    useEffect(() => {
        const getuserinfo = async () => {
            try {
                // Get token from session storage
                const storedToken = sessionStorage.getItem("token");
                setToken(storedToken); // Set token in state
                console.log("Request Headers: ", axios.defaults.headers.common);
                const response = await axios.post(
                    "https://chatback-ryc1.onrender.com/api/v1/user/userinfo",
                    { token: storedToken }, // Send token in the request body
                    { headers: { Authorization: `Bearer ${storedToken}` } } // Include token in headers
                );
                setUser(response.data);
                // Emit the username to the server after fetching user info
                socket.emit("username", response.data.username);
            } catch (error) {
                console.log("Error obtaining user:", error);
            }
        };
        getuserinfo();
    }, []);

    useEffect(() => {
        // Fetch all users from the backend
        const getAllUsers = async () => {
            try {
                console.log("Request Headers: ", axios.defaults.headers.common);
                const response = await axios.get(
                    "https://chatback-ryc1.onrender.com/api/v1/user/allusers",
                    { headers: { Authorization: `Bearer ${token}` } } // Include token in headers
                );
                setallusers(response.data);
            } catch (error) {
                console.log("Error fetching users:", error);
            }
        };
        getAllUsers();
    }, [token]); // Include token in dependency array

    // When a user is selected from the dropdown
    const obtainUsers = (e) => {
        const selectedUserId = e.target.value;
        const selectedUser = allusers.find(
            (user) => user._id === selectedUserId
        );
        setSelectedUser(selectedUser);
        // Emit the selected username to the server
        socket.emit("selectedUser", { userId: selectedUser.username });
    };

    // Send a message to the selected user
    const sendMessage = () => {
        if (!selectedUser._id || !message) {
            return toast.error("Please select a user and enter a message");
        }
        socket.emit("sendMessage", {
            from: user.username,
            to: selectedUser.username,
            message,
        });
        setMessages([...messages, { from: "You", message }]);
        setmessage("");
    };

    useEffect(() => {
        // Receive incoming messages
        socket.on("message", (data) => {
            setMessages([
                ...messages,
                { from: data.from, message: data.message },
            ]);
        });
    }, [messages]);

    useEffect(() => {
        console.log("User: ", user);
    }, [user]);

    // Log headers in the frontend
    useEffect(() => {
        console.log("Headers: ", axios.defaults.headers.common);
    }, []);

    return (
        <div className="flex flex-col sm:flex-row">
            <div className="flex flex-col justify-center items-center border p-3 rounded-lg ">
                <h1>Chat</h1>
                <label htmlFor="msg">message: </label>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setmessage(e.target.value)}
                    className="border p-3 text-black rounded "
                    placeholder="message"
                />

                <button
                    onClick={sendMessage}
                    className="border bg-green-600 px-6 py-4 m-6 rounded-lg font-semibold"
                >
                    Send
                </button>
            </div>
            <div className="flex flex-col justify-center items-center border p-3 rounded-lg">
                <h1>Chat private:</h1>
                <div className="flex flex-col ">
                    <select
                        className="border p-3 w-[300px] text-black rounded text-center"
                        placeholder="search contact"
                        onChange={(e) => obtainUsers(e)}
                    >
                        <option value="">select contact</option>
                        {allusers.map((user) => (
                            <option
                                value={user._id}
                                key={user._id}
                                className="text-black"
                            >
                                {user.username}
                            </option>
                        ))}
                    </select>
                    {messages.map((msg, index) => (
                        <div key={index}>
                            <p>
                                {msg.from}: {msg.message}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Chat;
