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

export default Home;