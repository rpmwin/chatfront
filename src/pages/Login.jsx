import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login() {
    const [user, setUser] = useState({});

    const loginUser = async (e) => {
        try {
            const response = await toast.promise(
                axios.post(
                    "https://chatback-ryc1.onrender.com/api/v1/user/login",
                    user,
                    {
                        withCredentials: true,
                    }
                ),
                {
                    pending: "logging User",
                    success: "User logged in Successfully",
                    error: "Something went wrong in the register user",
                }
            );
        } catch (error) {
            console.log("something went wrong in the logging user", error);
        }
    };

    return (
        <div>
            <h1>Login</h1>

            <form
                className="flex flex-col justify-center items-center"
                onSubmit={(e) => {
                    e.preventDefault(), loginUser(e);
                }}
            >
                <input
                    type="email"
                    placeholder="email"
                    required
                    className="input p-3 text-center rounded text-black m-3"
                    onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                    }
                />
                <input
                    type="password"
                    placeholder="password"
                    required
                    className="input p-3 text-center rounded text-black m-3"
                    onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                    }
                />
                <button className="btn p-4 bg-green-500 w-1/2 rounded">
                    login
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;
