<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import logo from "../assets/Logo.svg";
import { useAuthStore } from "../store/useAuthStore";
import axios from "axios";
import ProfileDropdown from "./ProfileDropdown";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
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

    if (isLoggedIn) {
      fetchUser();
    }
  }, [isLoggedIn]);
  return (
    <nav className="w-full h-20 flex items-center justify-between px-5 fixed top-0 z-20 bg-gradient-to-r from-blue-300 to-blue-500">
      {/* Logo */}
      <div className="flex items-center justify-between cursor-pointer">
        <img src={logo} alt="My logo" className="w-20 h-15" onClick={() => navigate("/")} />

        <h1 className="text-3xl bg-gradient-to-r from-black to-white bg-clip-text text-transparent font-bold" onClick={() => navigate("/")}>
          Exam-Store
        </h1>
      </div>

      {isLoggedIn ? (
        <>
          <form className="hidden sm:flex w-1/3 h-10 bg-white items-center justify-center rounded-2xl overflow-hidden">
            <input
              type="text"
              placeholder="Search Papers..."
              className="w-[70%] h-full px-5 text-lg border-none outline-none "
            />
            <button className="w-[30%] h-full flex items-center justify-end pr-5 bg-white border-none">
              <IoSearchSharp />
            </button>
          </form>

          {/* List of items */}
          <ul className="flex items-center justify-between gap-10 text-sky-50 list-none text-xl pr-2">
            <li className="cursor-pointer hover:text-cyan-300  hover:border-b-2 hover:scale-125 border-white transition-all duration-500 " onClick={() => navigate("/")}>
              Home
            </li>
            <li className="cursor-pointer hover:text-cyan-300 hover:border-b-2 transition-all duration-500  hover:scale-125 border-white" onClick={() => navigate("/about")}>
              About
            </li>
            <li className="cursor-pointer hover:text-cyan-300 hover:border-b-2  transition-all duration-500  hover:scale-125 border-white" onClick={() => navigate("/contact")}>
              Contact
            </li>
            <ProfileDropdown authUser={user} logout={logout} />
          </ul>
        </>
      ) : (
        <>
          {/* List of items */}
          <ul className="flex items-center justify-between gap-10 text-sky-50 list-none text-xl pr-2">
            <li className="cursor-pointer hover:text-cyan-300  hover:border-b-2 hover:scale-125 border-white transition-all duration-500 ">
              Home
            </li>
            <li className="cursor-pointer hover:text-cyan-300 hover:border-b-2 transition-all duration-500  hover:scale-125 border-white">
              About
            </li>
            <li className="cursor-pointer hover:text-cyan-300 hover:border-b-2  transition-all duration-500  hover:scale-125 border-white">
              Contact
            </li>
          </ul>

          {/* Signup and signin buttons */}
          <div className="flex items-center justify-between gap-5 text-xl">
            <button
              className="cursor-pointer text-sky-50 hover:text-cyan-300 transition-all duration-500  hover:scale-105"
              onClick={() => navigate("/login")}
            >
              SignIn
            </button>
            <button
              className="cursor-pointer bg-black text-sky-50 px-5 py-1.5 hover:text-cyan-300 transition-all duration-500  hover:scale-105 rounded-sm"
              onClick={() => navigate("/signup")}
            >
              SignUp
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Nav;
=======
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
    <nav className="w-full fixed top-0 z-20 bg-gradient-to-r from-blue-400 to-blue-600 shadow-md">
      <div className="w-[92%] max-w-7xl mx-auto flex items-center justify-between h-16 px-2">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="ExamStore logo" className="w-12 h-12" />
          <h1 className="text-2xl bg-gradient-to-r from-black to-white bg-clip-text text-transparent font-bold">
            Exam-Store
          </h1>
        </div>

        {isLoggedIn ? (
          <div className="flex items-center gap-6">
            {/* Search Bar */}
            <form className="hidden sm:flex w-72 h-9 bg-white items-center rounded-full overflow-hidden shadow-sm">
              <input
                type="text"
                placeholder="Search Papers..."
                className="w-[70%] h-full px-3 text-sm border-none outline-none"
              />
              <button className="w-[30%] flex items-center justify-center text-gray-600 hover:text-blue-600">
                <IoSearchSharp size={18} />
              </button>
            </form>

            {/* Nav Items */}
            <ul className="flex items-center gap-6 text-white text-base font-medium">
              <li
                className="cursor-pointer hover:text-cyan-200 hover:scale-110 transition"
                onClick={() => navigate("/")}
              >
                Home
              </li>
              <li
                className="cursor-pointer hover:text-cyan-200 hover:scale-110 transition"
                onClick={() => navigate("/about")}
              >
                About
              </li>
              <li
                className="cursor-pointer hover:text-cyan-200 hover:scale-110 transition"
                onClick={() => navigate("/contact")}
              >
                Contact
              </li>
            </ul>

            {/* Notification + Theme Toggle */}
            <div className="flex items-center gap-3">
              <button
                className="bg-black/80 text-white p-2 rounded-full hover:bg-black transition"
                id="notificationBell"
              >
                🔔
              </button>
              <button
                className="bg-black/80 text-white p-2 rounded-full hover:bg-black transition"
                onClick={toggleTheme}
              >
                {isDarkMode ? "🌙" : "🌞"}
              </button>
            </div>

            {/* Profile */}
            <ProfileDropdown authUser={user} logout={logout} />
          </div>
        ) : (
          <div className="flex items-center gap-5 text-white text-lg font-medium">
            <ul className="flex items-center gap-5">
              <li
                className="cursor-pointer hover:text-cyan-200 hover:scale-110 transition"
                onClick={() => navigate("/")}
              >
                Home
              </li>
              <li
                className="cursor-pointer hover:text-cyan-200 hover:scale-110 transition"
                onClick={() => navigate("/about")}
              >
                About
              </li>
              <li
                className="cursor-pointer hover:text-cyan-200 hover:scale-110 transition"
                onClick={() => navigate("/contact")}
              >
                Contact
              </li>
            </ul>

            {/* Login / Signup */}
            <button
              className="hover:text-cyan-200 transition"
              onClick={() => navigate("/login")}
            >
              SignIn
            </button>
            <button
              className="bg-black/80 text-white px-4 py-1.5 rounded-md hover:bg-black transition"
              onClick={() => navigate("/signup")}
            >
              SignUp
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
>>>>>>> c4918f52dd01d076d772225ffd4fd66b3aad434a
