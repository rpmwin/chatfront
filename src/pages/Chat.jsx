import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Chat() {
    const socket = useMemo(() => io("http://localhost:3232"), []);
    const [allusers, setallusers] = useState([]);
    const [message, setmessage] = useState("");
    const [selectedUser, setSelectedUser] = useState({});
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState({});

    // Fetch user info when component mounts
    useEffect(() => {
        const getuserinfo = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:3232/api/v1/user/userinfo",
                    { data: "dummydata" },
                    { withCredentials: true }
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
                const response = await axios.get(
                    "http://localhost:3232/api/v1/user/allusers"
                );
                setallusers(response.data);
            } catch (error) {
                console.log("Error fetching users:", error);
            }
        };
        getAllUsers();
    }, []);

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
        if (!selectedUser._id || !message) return;
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
        console.log("User: " , user);
    }, [user]);


    return (
        <div className="flex">
            <div className="flex flex-col justify-center items-center border p-3 rounded-lg">
                <h1>Chat</h1>
                <label htmlFor="msg">message: </label>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setmessage(e.target.value)}
                    className="border p-3 text-black rounded "
                    placeholder="message"
                />
                <label htmlFor="msg">room: </label>
                <input
                    type="text"
                    className="border p-3 text-black rounded "
                    placeholder="room"
                />
                <button onClick={sendMessage}>Send</button>
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
