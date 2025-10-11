import React, { useState } from "react";
import image from "../assets/Login_img.jpg";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore.js";
import { Mail, Lock } from "lucide-react";
import { Loader2 } from "lucide-react";
import Features from "../components/Features.jsx";

const Login = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good Morning ";
    } else if (hour < 18) {
      return "Good Afternoon ";
    } else {
      return "Good Evening ";
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/^[a-zA-Z0-9._%+-]+@student\.nitw\.ac\.in$/.test(formData.email)) {
      return toast.error("Invalid Email");
    }
    if (!formData.password) return toast.error("Password is required");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) login(formData);
  };

  return (
    <div>
      <div className="flex h-screen bg-gradient-to-bl from-blue-400 to-white">
        {/* Right Side - Illustration */}
        <div className="w-[45%] flex justify-center items-center bg-gray-700 shadow-lg rounded-lg p-12">
          <div className="w-3/4">
            <h2 className="text-3xl font-semibold text-white">
              Hello! {getGreeting()}
            </h2>
            <p className="text-white mt-2">Sign in to continue.</p>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-6 text-white">
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 pl-10 rounded border border-white focus:outline-none focus:border-blue-500 mb-4"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-3 pl-10 rounded border border-white focus:outline-none focus:border-blue-500 mb-4"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
              <div className="my-2.5 ">
                <p className="text-white text-sm ">
                  <Link to="/forgot-password" className="text-blue-500">
                    Forgot password?
                  </Link>
                </p>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Signup & Forgot Password Links */}
            <div className="mt-2 text-center">
              <p className="text-white text-sm">
                Don't have an account? {" "}
                <Link to="/signup" className="link link-primary text-blue-500">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Left Side - Illustration */}
        <div className="w-[50%] flex flex-col justify-center items-center text-center px-8 text-white">
          <h2 className="text-3xl font-bold mt-6">Welcome Back</h2>
          <p className="mt-2 text-xm opacity-100">sign in now and take control of your journey!.</p>
          <img src={image} alt="" className="w-150 mt-6 h-100 ml-15" />
        </div>
      </div>
      <Features />
    </div>
  );
};

export default Login;
