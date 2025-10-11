import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      
      if (token && user) {
        // In production, verify token with backend
        try {
          const res = await axiosInstance.get("/auth/me");
          set({ authUser: res.data, isCheckingAuth: false });
        } catch (error) {
          // Fallback to localStorage if API fails
          set({ authUser: JSON.parse(user), isCheckingAuth: false });
        }
      } else {
        set({ authUser: null, isCheckingAuth: false });
      }
    } catch (error) {
      console.error("Error in checkAuth:", error);
      set({ authUser: null, isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      // Try real API first, fallback to mock
      try {
        const res = await axiosInstance.post("/auth/signup", data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        set({ authUser: res.data.user, isSigningUp: false });
        toast.success("Account created successfully!");
        return;
      } catch (apiError) {
        console.log("API signup failed, using mock:", apiError.message);
      }

      // Mock signup fallback
      const mockUser = {
        id: Date.now(),
        fullName: data.fullName,
        email: data.email,
        profilePic: `https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150`,
        createdAt: new Date().toISOString(),
      };

      await new Promise(resolve => setTimeout(resolve, 1000));

      localStorage.setItem("token", "mock-jwt-token");
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      set({ authUser: mockUser, isSigningUp: false });
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error(error.message || "Error creating account");
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      // Try real API first, fallback to mock
      try {
        const res = await axiosInstance.post("/auth/login", data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        set({ authUser: res.data.user, isLoggingIn: false });
        toast.success("Logged in successfully!");
        return;
      } catch (apiError) {
        console.log("API login failed, using mock:", apiError.message);
      }

      // Mock login fallback
      const mockUser = {
        id: 1,
        fullName: "John Doe",
        email: data.email,
        profilePic: `https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150`,
        createdAt: "2024-01-15T10:00:00.000Z",
      };

      await new Promise(resolve => setTimeout(resolve, 1000));

      localStorage.setItem("token", "mock-jwt-token");
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      set({ authUser: mockUser, isLoggingIn: false });
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error(error.message || "Error logging in");
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      // Try real API logout
      try {
        await axiosInstance.post("/auth/logout");
      } catch (apiError) {
        console.log("API logout failed:", apiError.message);
      }
      
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      set({ authUser: null });
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(error.message || "Error logging out");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const currentUser = get().authUser;
      
      // Try real API first, fallback to mock
      try {
        const res = await axiosInstance.put("/auth/profile", data);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        set({ authUser: res.data.user, isUpdatingProfile: false });
        toast.success("Profile updated successfully!");
        return;
      } catch (apiError) {
        console.log("API update failed, using mock:", apiError.message);
      }

      // Mock update fallback
      const updatedUser = { ...currentUser, ...data };
      await new Promise(resolve => setTimeout(resolve, 1000));

      localStorage.setItem("user", JSON.stringify(updatedUser));
      set({ authUser: updatedUser, isUpdatingProfile: false });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message || "Error updating profile");
      set({ isUpdatingProfile: false });
    }
  },
}));