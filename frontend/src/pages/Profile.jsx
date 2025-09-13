import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, Award, Download, FileText } from "lucide-react";

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const userStats = {
    papersDownloaded: 45,
    favoriteSubjects: ['Data Structures', 'Operating Systems', 'Database Management'],
    recentActivity: [
      { action: 'Downloaded', subject: 'Computer Networks', date: '2 days ago' },
      { action: 'Downloaded', subject: 'Algorithm Design', date: '1 week ago' },
      { action: 'Downloaded', subject: 'Software Engineering', date: '2 weeks ago' },
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
              {/* Profile Picture */}
              <div className="relative">
                <img
                  src={selectedImg || authUser.profilePic || "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`
                    absolute bottom-0 right-0 
                    bg-blue-500 hover:bg-blue-600 hover:scale-105
                    p-3 rounded-full cursor-pointer 
                    transition-all duration-200 shadow-lg
                    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                  `}
                >
                  <Camera className="w-5 h-5 text-white" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>

              {/* User Info */}
              <div className="text-center md:text-left text-white">
                <h1 className="text-3xl font-bold mb-2">{authUser?.fullName}</h1>
                <p className="text-blue-100 mb-4">{authUser?.email}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <div className="text-2xl font-bold">{userStats.papersDownloaded}</div>
                    <div className="text-sm text-blue-100">Papers Downloaded</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <div className="text-2xl font-bold">4.8</div>
                    <div className="text-sm text-blue-100">Avg. Rating</div>
                  </div>
                </div>
              </div>
            </div>
            
            {isUpdatingProfile && (
              <p className="text-center text-blue-100 mt-4">
                Updating profile picture...
              </p>
            )}
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Account Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Account Information
                </h2>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Full Name</div>
                    <div className="font-medium text-gray-800">{authUser?.fullName}</div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Email Address</div>
                    <div className="font-medium text-gray-800">{authUser?.email}</div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Member Since</div>
                    <div className="font-medium text-gray-800 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                      {new Date(authUser.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Account Status</div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                      <span className="font-medium text-green-600">Active</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity & Stats */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-blue-600" />
                  Your Activity
                </h2>
                
                {/* Favorite Subjects */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-3">Favorite Subjects</h3>
                  <div className="flex flex-wrap gap-2">
                    {userStats.favoriteSubjects.map((subject, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Recent Downloads
                  </h3>
                  <div className="space-y-3">
                    {userStats.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-800">{activity.subject}</div>
                          <div className="text-sm text-gray-600">{activity.action}</div>
                        </div>
                        <div className="text-sm text-gray-500">{activity.date}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      Change Password
                    </button>
                    <button className="w-full text-left px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      Download History
                    </button>
                    <button className="w-full text-left px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      Account Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
