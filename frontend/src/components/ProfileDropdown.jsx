import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"; // Ensure you use the store

const ProfileDropdown = ({ logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { authUser } = useAuthStore(); // Fetch auth user from global store
  const [profilePic, setProfilePic] = useState(authUser?.profilePic || "/avatar.png");

  // Sync state when authUser.profilePic changes
  useEffect(() => {
    setProfilePic(authUser?.profilePic || "/avatar.png");
  }, [authUser?.profilePic]);

  return (
    <div className="relative mt-2">
      {/* Profile Icon */}
      <button
        className="text-sky-50 text-2xl hover:text-cyan-300 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={profilePic} className="size-11 rounded-full" alt="Profile" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-black text-sky-50 rounded-md shadow-lg">
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-800 transition"
            onClick={() => {
              navigate("/profile");
              setIsOpen(false);
            }}
          >
            Profile
          </button>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-800 transition"
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
