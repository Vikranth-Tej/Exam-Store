import React from "react";
import logo from "../assets/Logo.svg";

const Nav = () => {
  return (
    <nav className="w-full h-20 flex items-center justify-between px-5 fixed top-0 z-20 bg-[#3859dc]">
      {/* Logo */}
      <div className="flex items-center justify-between cursor-pointer">
        <img src={logo} alt="My logo" className="w-20 h-15" />

        <h1 className="text-3xl bg-gradient-to-r from-black to-white bg-clip-text text-transparent font-bold">
          Exam-Store
        </h1>
      </div>

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
        <button className="cursor-pointer text-sky-50 hover:text-cyan-300 transition-all duration-500  hover:scale-105">
          SignIn
        </button>
        <button className="cursor-pointer bg-black text-sky-50 px-5 py-1.5 hover:text-cyan-300 transition-all duration-500  hover:scale-105 rounded-sm">
          SignUp
        </button>
      </div>
    </nav>
  );
};

export default Nav;
