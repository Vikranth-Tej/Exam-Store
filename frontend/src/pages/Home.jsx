<<<<<<< HEAD
import React, { useState } from "react";
import { Search, BookOpen, Clock, Download, Calendar, FileText, TrendingUp } from "lucide-react";

const Home = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [activeTab, setActiveTab] = useState("recent");
  
  const recentPapers = [
    { title: "Computer Networks", year: "2023", downloads: 342, subject: "CS301" },
    { title: "Operating Systems", year: "2022", downloads: 289, subject: "CS201" },
    { title: "Machine Learning", year: "2021", downloads: 456, subject: "CS401" },
    { title: "Database Management Systems", year: "2023", downloads: 218, subject: "CS302" },
  ];
  
  const recentActivities = [
    { action: "Uploaded", item: "DBMS Question Paper", time: "2 days ago" },
    { action: "Updated", item: "OS Notes", time: "5 days ago" },
    { action: "Added", item: "Data Structures Paper", time: "1 week ago" },
    { action: "Downloaded", item: "Artificial Intelligence Notes", time: "1 week ago" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 bg-base-200 min-h-screen">
      <header className="text-center space-y-4 mb-8 p-6 bg-base-100 rounded-box shadow-xl">
        <h1 className="text-4xl font-bold text-primary">Exam Store</h1>
        <p className="text-base-content/70 max-w-xl mx-auto">
          Access previous year question papers, study materials, and more to ace your exams
        </p>
      </header>
      
      {/* Search Section */}
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title flex items-center text-primary border-b border-base-300 pb-4">
            <Search className="mr-2 h-5 w-5" />
            Advanced Search
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <select className="select select-bordered w-full focus:outline-primary">
              <option disabled selected>Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
            
            <select className="select select-bordered w-full focus:outline-primary">
              <option disabled selected>Select Semester</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
            </select>
            
            <input type="text" placeholder="Subject Name" className="input input-bordered w-full focus:outline-primary" />
            <input type="text" placeholder="Subject Code" className="input input-bordered w-full focus:outline-primary" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <select className="select select-bordered w-full focus:outline-primary">
              <option disabled selected>Exam Type</option>
              <option value="mid">Mid Term</option>
              <option value="final">Final Exam</option>
              <option value="quiz">Quiz</option>
            </select>
            
            <select className="select select-bordered w-full focus:outline-primary">
              <option disabled selected>Sort By</option>
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="az">A-Z</option>
            </select>
          </div>
          
          <div className="card-actions justify-end mt-6">
            <button 
              className="btn btn-primary btn-block shadow-md hover:shadow-lg" 
              onClick={() => setSearchActive(true)}
            >
              Search Papers
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="w-full bg-base-100 p-6 rounded-box shadow-xl">
        <div className="tabs tabs-boxed justify-center mb-6 bg-base-200 p-1 rounded-xl">
          <button 
            className={`tab ${activeTab === "recent" ? "tab-active font-bold shadow-md" : ""} gap-2`}
            onClick={() => setActiveTab("recent")}
          >
            <Clock className="h-4 w-4" />
            Recent Papers
          </button>
          <button 
            className={`tab ${activeTab === "popular" ? "tab-active font-bold shadow-md" : ""} gap-2`}
            onClick={() => setActiveTab("popular")}
          >
            <TrendingUp className="h-4 w-4" />
            Popular Papers
          </button>
          <button 
            className={`tab ${activeTab === "activity" ? "tab-active font-bold shadow-md" : ""} gap-2`}
            onClick={() => setActiveTab("activity")}
          >
            <FileText className="h-4 w-4" />
            Activity
          </button>
        </div>

        {/* Recent Papers Tab */}
        {activeTab === "recent" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentPapers.map((paper, index) => (
              <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-all border border-base-300">
                <div className="card-body p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="card-title text-lg text-primary">{paper.title}</h3>
                    <div className="badge badge-primary badge-outline shadow-sm">{paper.year}</div>
                  </div>
                  <div className="flex items-center text-sm opacity-70 mt-2 border-t border-base-200 pt-2">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>{paper.subject}</span>
                    <span className="mx-2">•</span>
                    <Download className="h-4 w-4 mr-1" />
                    <span>{paper.downloads} downloads</span>
                  </div>
                  <div className="card-actions justify-end mt-3">
                    <button className="btn btn-outline btn-primary btn-sm btn-block shadow-sm hover:shadow">Download Paper</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Popular Papers Tab */}
        {activeTab === "popular" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentPapers.sort((a, b) => b.downloads - a.downloads).map((paper, index) => (
              <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-all border border-base-300">
                <div className="card-body p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="card-title text-lg text-primary">{paper.title}</h3>
                    <div className="badge badge-secondary badge-outline shadow-sm">{paper.downloads} downloads</div>
                  </div>
                  <div className="flex items-center text-sm opacity-70 mt-2 border-t border-base-200 pt-2">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>{paper.subject}</span>
                    <span className="mx-2">•</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{paper.year}</span>
                  </div>
                  <div className="card-actions justify-end mt-3">
                    <button className="btn btn-outline btn-secondary btn-sm btn-block shadow-sm hover:shadow">Download Paper</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Activity Tab */}
        {activeTab === "activity" && (
          <div className="card bg-base-100 shadow-lg border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-primary border-b border-base-200 pb-3">Recent Activity</h2>
              <div className="space-y-4 mt-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center p-4 rounded-lg bg-base-100 shadow hover:shadow-md transition-all border border-base-200">
                    <div className="bg-primary/10 text-primary p-3 rounded-full mr-4 shadow-sm">
                      {activity.action === "Uploaded" && <FileText className="h-5 w-5" />}
                      {activity.action === "Updated" && <BookOpen className="h-5 w-5" />}
                      {activity.action === "Added" && <FileText className="h-5 w-5" />}
                      {activity.action === "Downloaded" && <Download className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.action} "<span className="text-primary">{activity.item}</span>"</p>
                      <p className="text-sm opacity-70 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all">
          <div className="card-body flex flex-col items-center justify-center p-6">
            <div className="bg-success/20 text-success p-4 rounded-full mb-4 shadow-md">
              <FileText className="h-8 w-8" />
            </div>
            <h3 className="text-3xl font-bold text-success">500+</h3>
            <p className="opacity-70 mt-1">Question Papers</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all">
          <div className="card-body flex flex-col items-center justify-center p-6">
            <div className="bg-secondary/20 text-secondary p-4 rounded-full mb-4 shadow-md">
              <BookOpen className="h-8 w-8" />
            </div>
            <h3 className="text-3xl font-bold text-secondary">50+</h3>
            <p className="opacity-70 mt-1">Subjects</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all">
          <div className="card-body flex flex-col items-center justify-center p-6">
            <div className="bg-accent/20 text-accent p-4 rounded-full mb-4 shadow-md">
              <Download className="h-8 w-8" />
            </div>
            <h3 className="text-3xl font-bold text-accent">10k+</h3>
            <p className="opacity-70 mt-1">Downloads</p>
          </div>
        </div>
      </div>
      
      {/* About Section */}
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-primary border-b border-base-200 pb-3">About Exam Store</h2>
          <p className="opacity-80 mt-4">
            Exam Store is a comprehensive platform created by <span className="font-semibold text-primary">Jayanth Chintalapati</span> and team. 
            We aim to help students easily access previous year question papers, study materials, and resources to prepare 
            effectively for their exams. Our collection spans across multiple years, subjects, and courses.
          </p>
          <div className="card-actions justify-start mt-6">
            <button className="btn btn-outline btn-primary btn-sm shadow-sm hover:shadow-md">Contact Us</button>
            <button className="btn btn-outline btn-primary btn-sm shadow-sm hover:shadow-md">Contribute</button>
            <button className="btn btn-outline btn-primary btn-sm shadow-sm hover:shadow-md">Report Issue</button>
          </div>
        </div>
      </div>
    </div>
  );
};

=======
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { usePaperStore } from "../store/usePaperStore";
import Features from "../components/Features";
import { FileText, Download, Users, TrendingUp, Search, ArrowRight } from "lucide-react";

const Home = () => {
  const { authUser } = useAuthStore();
  const { papers, getRecentPapers } = usePaperStore();
  const [stats, setStats] = useState({
    totalPapers: 0,
    totalDownloads: 0,
    totalUsers: 0,
    recentPapers: 0
  });

  useEffect(() => {
    getRecentPapers();
    // Simulate stats (in real app, fetch from API)
    setStats({
      totalPapers: 2500,
      totalDownloads: 45000,
      totalUsers: 12000,
      recentPapers: papers.length
    });
  }, [getRecentPapers]);

  const recentPapers = papers.slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to <span className="text-yellow-300">Exam Store</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Your ultimate destination for previous year question papers. 
              Access thousands of papers and boost your exam preparation today!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/papers"
                className="inline-flex items-center px-8 py-4 bg-yellow-400 text-blue-900 font-semibold rounded-lg hover:bg-yellow-300 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <Search className="w-5 h-5 mr-2" />
                Browse Papers
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-700 transition-all duration-200"
              >
                Learn More
              </Link>
            </div>

            {/* Welcome Message for Logged-in Users */}
            {authUser && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto border border-white/20">
                <h2 className="text-2xl font-semibold mb-2">
                  Hello, {authUser.fullName?.split(' ')[0]}! 👋
                </h2>
                <p className="text-blue-100">
                  Ready to continue your exam preparation journey? Check out the latest papers or browse by your preferred filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: FileText, label: "Question Papers", value: stats.totalPapers.toLocaleString(), color: "blue" },
              { icon: Download, label: "Total Downloads", value: stats.totalDownloads.toLocaleString(), color: "green" },
              { icon: Users, label: "Active Users", value: stats.totalUsers.toLocaleString(), color: "purple" },
              { icon: TrendingUp, label: "Success Rate", value: "94%", color: "orange" }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-${stat.color}-100 rounded-lg mb-4 group-hover:bg-${stat.color}-200 transition-colors`}>
                    <Icon className={`w-8 h-8 text-${stat.color}-600`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Papers Section */}
      {authUser && recentPapers.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Recently Added Papers</h2>
              <p className="text-xl text-gray-600">Fresh question papers added to help with your preparation</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPapers.map((paper, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800 mb-1">{paper.subject}</h3>
                      <p className="text-gray-600 text-sm">{paper.branch} • {paper.semester} Semester</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                      {paper.year}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Added {new Date().toLocaleDateString()}
                    </div>
                    <Link
                      to="/papers"
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                    >
                      View <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link
                to="/papers"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Papers <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <Features />
    </div>
  );
};

>>>>>>> c4918f52dd01d076d772225ffd4fd66b3aad434a
export default Home;