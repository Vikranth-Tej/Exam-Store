import React from "react";
import backgroundImage from "../assets/contact_background.jpg";

const Contact = () => {
  return (
    <div
      id="contact"
      className="w-full h-full flex flex-col md:flex-row overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen flex items-center justify-center">
        <form
          action="https://formspree.io/f/xbllrebe"
          method="POST"
          className="w-4/5 h-4/5 md:h-3/5 text-white shadow-[2px_2px_10px_black,2px_2px_20px_blue] flex flex-col items-center justify-center gap-5 p-5 rounded-2xl transition-shadow duration-300 hover:shadow-[2px_2px_10px_rgb(105,208,215),2px_2px_20px_rgb(105,208,215)]"
        >
          <h1 className="text-3xl text-white">Contact Us</h1>
          <input
            name="username"
            type="text"
            placeholder="Name"
            className="w-4/5 h-12 text-white border-2 border-blue-400 rounded-2xl px-5 outline-none"
          />
          <input
            type="email"
            name="Email"
            placeholder="Email"
            className="w-4/5 h-12 border-2 text-white border-blue-400 rounded-2xl px-5 outline-none"
          />
          <textarea
            name="message"
            id="textarea"
            placeholder="Message me"
            className="w-4/5 h-48 border-2 text-white border-blue-400 rounded-2xl p-5 outline-none"
          ></textarea>
          <input
            type="submit"
            id="btn"
            value="Send"
            className="w-24 h-12 bg-blue-400 flex items-center justify-center text-lg cursor-pointer transition-all duration-300 hover:bg-transparent hover:text-[#69d0d7] border-2 border-[#69d0d7] rounded-lg"
          />
        </form>
      </div>
    </div>
  );
};

export default Contact;
