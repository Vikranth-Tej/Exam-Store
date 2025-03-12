import React from "react";
import backgroundImage from "../assets/about_bg.jpg";
const Home = () => {
  return (
    <div>
      <div
        className="pt-20 w-full min-h-screen flex flex-col md:flex-row overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="max-w-2xl mx-auto p-4 py-8">
          <div className="bg-base-300 rounded-xl p-6 space-y-8 w-xl backdrop-blur-sm shadow-[2px_2px_10px_black,2px_2px_20px_blue] transition-shadow duration-300 hover:shadow-[2px_2px_10px_rgb(105,208,215),2px_2px_20px_rgb(105,208,215)]">
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-white">About</h1>
              <p className="mt-2 text-white">Your information</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
