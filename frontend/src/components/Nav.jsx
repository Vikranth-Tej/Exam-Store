import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import logo from "../assets/Logo.svg";
import { useAuthStore } from "../store/useAuthStore";
import axios from "axios";
import ProfileDropdown from "./ProfileDropdown";

const Nav = ({ toggleTheme, isDarkMode }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { authUser, logout } = useAuthStore();
  const isLoggedIn = !!authUser;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth", { withCredentials: true });
        setUser(res.data);
      } catch (error) {
        console.log("User not logged in");
      }
    };
    if (isLoggedIn) fetchUser();
  }, [isLoggedIn]);

  return (
    <nav className="w-full fixed top-0 z-30 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 backdrop-blur-lg shadow-md">
      <div className="w-[92%] max-w-7xl mx-auto flex items-center justify-between h-18 px-3">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="ExamStore logo" className="w-11 h-11" />
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Exam Store
          </h1>
        </div>

        {isLoggedIn ? (
          <div className="flex items-center gap-6">
            {/* Search Bar */}
            <form className="hidden sm:flex w-72 h-9 bg-white items-center rounded-full overflow-hidden shadow-sm border border-gray-200">
              <input
                type="text"
                placeholder="Search papers..."
                className="w-[70%] h-full px-3 text-sm border-none outline-none text-gray-700 placeholder-gray-400"
              />
              <button className="w-[30%] flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors">
                <IoSearchSharp size={18} />
              </button>
            </form>

            {/* Nav Items */}
            <ul className="flex items-center gap-6 text-white font-medium">
              <li
                className="cursor-pointer hover:text-cyan-200 hover:scale-105 transition"
                onClick={() => navigate("/papers")}
              >
                Papers
              </li>
              <li
                className="cursor-pointer hover:text-cyan-200 hover:scale-105 transition"
                onClick={() => navigate("/about")}
              >
                About
              </li>
              <li
                className="cursor-pointer hover:text-cyan-200 hover:scale-105 transition"
                onClick={() => navigate("/contact")}
              >
                Contact
              </li>
            </ul>

            {/* Notification + Theme Toggle */}
            <div className="flex items-center gap-3">
              <button
                className="bg-black/70 text-white p-2 rounded-full hover:bg-black transition"
                id="notificationBell"
              >
                🔔
              </button>
              <button
                className="bg-black/70 text-white p-2 rounded-full hover:bg-black transition"
                onClick={toggleTheme}
              >
                {isDarkMode ? "🌙" : "🌞"}
              </button>
            </div>

            {/* Profile */}
            <ProfileDropdown authUser={user} logout={logout} />
          </div>
        ) : (
          <div className="flex items-center gap-6 text-white text-lg font-medium">
            <ul className="flex items-center gap-6">
              <li
                className="cursor-pointer hover:text-cyan-200 hover:scale-105 transition"
                onClick={() => navigate("/")}
              >
                Home
              </li>
              <li
                className="cursor-pointer hover:text-cyan-200 hover:scale-105 transition"
                onClick={() => navigate("/about")}
              >
                About
              </li>
              <li
                className="cursor-pointer hover:text-cyan-200 hover:scale-105 transition"
                onClick={() => navigate("/contact")}
              >
                Contact
              </li>
            </ul>

            {/* Auth Buttons */}
            <button
              className="hover:text-cyan-200 transition"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
            <button
              className="bg-black/80 text-white px-4 py-1.5 rounded-md hover:bg-black transition"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
