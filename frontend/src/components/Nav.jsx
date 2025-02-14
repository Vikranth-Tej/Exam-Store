import React from "react";
import image from "../assets/react.svg"

const Nav = () => {
  return (
    <div className="w-full h-full absolute bg-gradient-to-r from-blue-600 to-white-2">
      <header className="flex justify-between bg-white py-6 px-8 md:px-32 drop-shadow-md ">
        <a href="#">
          <img src={image} alt="" />
        </a>
      </header>
    </div>
  );
};

export default Nav;
