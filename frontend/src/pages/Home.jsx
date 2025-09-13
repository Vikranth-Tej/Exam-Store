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

export default Home;