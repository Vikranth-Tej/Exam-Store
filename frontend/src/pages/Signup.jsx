import React, { useState } from "react";
import image from "../assets/image.jpg";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore.js";
import { User, Mail, Lock } from "lucide-react";
import { Loader2 } from "lucide-react";
import Features from "../components/Features.jsx";

const Signup = () => {
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
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/^[a-zA-Z0-9._%+-]+@student\.nitw\.ac\.in$/.test(formData.email)) {
      return toast.error("Invalid Email");
    }
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div>
      <div className="flex h-screen bg-gradient-to-bl from-white to-blue-300">
        {/* Left Side - Illustration */}
        <div className="w-[55%] flex justify-center items-center ">
          <div className="text-white text-center px-8 ">
            <img src={image} alt="" className="w-150" />
            <h2 className="text-3xl font-bold mt-6">Welcome to Exam Store</h2>
            <p className="mt-2 opacity-100">
              Sign up to explore premium features and enjoy a seamless
              experience.
            </p>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-[45%] flex justify-center items-center bg-gray-700 shadow-lg rounded-lg p-12">
          <div className="w-3/4">
            <h2 className="text-3xl font-semibold text-white">
              Hello! {getGreeting()}
            </h2>
            <p className="text-white mt-2">Create an account to get started.</p>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="mt-6 text-white">
              <div className="relative">
                <User
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 pl-10 rounded border border-white focus:outline-none focus:border-blue-500 mb-4"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>

              <div className="relative">
                <Mail
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
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
                <Lock
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
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

              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Login & Forgot Password Links */}

            <div className="mt-2 text-center">
              <p className="text-white text-sm">
                Already have an account?{" "}
                <Link to="/login" className="link link-primary text-blue-500">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Features />
    </div>
  );
};

export default Signup;
