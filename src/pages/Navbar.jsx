import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <div className="flex justify-center items-center">
            <NavLink
                to="/login"
                className={({ isActive }) =>
                    `text-3xl px-10 p-4 bg-slate-500 m-3 rounded-lg hover:bg-slate-600 ${
                        isActive ? "bg-orange-600" : ""
                    }`
                }
            >
                Login
            </NavLink>
            <NavLink
                to="/signup"
                className={({ isActive }) =>
                    `text-3xl px-10 p-4 bg-slate-500 m-3 rounded-lg hover:bg-slate-600 ${
                        isActive ? "bg-orange-600" : ""
                    }`
                }
            >
                Signup
            </NavLink>
            <NavLink
                to="/chat"
                className={({ isActive }) =>
                    `text-3xl px-10 p-4 bg-slate-500 m-3 rounded-lg hover:bg-slate-600 ${
                        isActive ? "bg-orange-600" : ""
                    }`
                }
            >
                Chat
            </NavLink>
        </div>
    );
}

export default Navbar;
