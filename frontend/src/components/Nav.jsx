import React from "react";
import { IoSearchSharp } from "react-icons/io5";

const Nav = () => {
  return (
    <nav className="w-full h-20 flex items-center justify-between px-5 fixed top-0 z-20 bg-[#459ad2] cursor-pointer">
      <h1 className="text-3xl bg-gradient-to-r from-black to-white bg-clip-text text-transparent font-bold">Exam-Store</h1>

      <form className="hidden sm:flex w-1/3 h-10 bg-white items-center justify-center rounded-2xl overflow-hidden">
        <input type="text" placeholder="Search Papers..." className="w-[70%] h-full px-5 text-lg border-none outline-none "   />
        <button className="w-[30%] h-full flex items-center justify-end pr-5 bg-white border-none">
          <IoSearchSharp />
        </button>
      </form>

      <ul className="hidden sm:flex items-center justify-center gap-5 text-black list-none text-md pr-2">
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

       
      
    </nav>
  );
};

export default Nav;
