import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Left Login Section */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-900 text-white p-8">
        <h2 className="text-3xl font-semibold">Login</h2>
        <p className="mt-2 text-gray-400">Enter your account details</p>

        <form className="w-3/4 mt-6">
          {/* Username Input */}
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 mb-4 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
            required
          />

          {/* Password Input with Toggle */}
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 pr-10 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-400"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "🙈" : "👁️"}
            </span>
          </div>

          {/* Forgot Password */}
          <a href="#" className="block text-gray-400 mt-2 text-sm">
            Forgot Password?
          </a>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full mt-4 p-3 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold transition"
          >
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-4 text-gray-400 text-sm flex justify-between">
          Don't have an account?
          <Link to="/signup" className="link link-primary text-blue-500">
                Sign up
              </Link>
        </div>
      </div>

      {/* Right Illustration Section */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-blue-700 to-blue-500 text-white text-center p-8">
        <h1 className="text-4xl font-bold">
          Welcome to <br />
          <span className="text-gray-200 text-6xl">Exam Store</span>
        </h1>
        <p className="mt-3 text-lg">Login to access your account</p>
      </div>
    </div>
  );
};

export default Login;
