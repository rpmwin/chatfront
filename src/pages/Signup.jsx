import axios from "axios";
import React, { useState } from "react";
import { Router } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
    const [user, setUser] = useState({});

    const registerUser = async (e) => {
        try {
            const response = await toast.promise(
                axios.post("https://chatback-ryc1.onrender.com/api/v1/user/signup", user),
                {
                    pending: "Registering User",
                    success: "User Registered Successfully",
                    error: "Something went wrong in the register user",
                }
            ).then((response) => {
                setTimeout(() => {
                    Router.push("/login");
                }, 2000);
            })
        } catch (error) {
            console.log("something went wrong in the register user", error);
        }
    };

    return (
        <div>
            <h1>Signup</h1>

            <form
                className="flex flex-col justify-center items-center"
                onSubmit={(e) => {
                    e.preventDefault(), registerUser(e);
                }}
            >
                <input
                    type="text"
                    placeholder="username"
                    required
                    className="input p-3 text-center rounded text-black m-3"
                    onChange={(e) =>
                        setUser({ ...user, username: e.target.value })
                    }
                />
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
                    Signup
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;
