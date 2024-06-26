import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
    const [user, setUser] = useState({});

    const loginUser = async (e) => {
        try {
            await toast
                .promise(loginRequest(), {
                    pending: "Logging In User",
                    success: "User Logged In Successfully",
                    error: "Something went wrong in the logging user",
                })
                .then((response) => {
                    setTimeout(() => {
                        Router.push("/login");
                    }, 2000);
                });
        } catch (error) {
            console.log("something went wrong in the logging user", error);
        }
    };

    const loginRequest = async () => {
        try {
            const response = await axios.post(
                "https://chatback-ryc1.onrender.com/api/v1/user/login",
                user
            );

            const token = response.data.token;
            console.log("token: ", token);
            console.log("response", response);
            console.log("response.data: ", response.data);
            console.log("response.data.token: ", response.data.token);
            localStorage.setItem("token", token); // Store in local storage
            sessionStorage.setItem("token", token);

            // Set token in headers for subsequent requests
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } catch (error) {
            throw error;
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
