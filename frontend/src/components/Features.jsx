import React from "react";
import { FileText, Users, Download, Shield, Search, Clock } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: FileText,
      title: "Comprehensive Question Bank",
      description: "Access question papers from various exams across multiple years, all in one place."
    },
    {
      icon: Search,
      title: "Advanced Search Filters",
      description: "Find papers quickly using our advanced filters by branch, semester, year, and subject."
    },
    {
      icon: Download,
      title: "Instant Downloads",
      description: "Download papers instantly in high-quality PDF format with just one click."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security and reliable access."
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Get guidance from our team of academic experts on your preparation journey."
    },
    {
      icon: Clock,
      title: "Regular Updates",
      description: "New papers are added regularly to keep our database current and comprehensive."
    }
  ];

  const testimonials = [
    {
      text: "The Exam Store has been a game-changer for my exam preparation. The variety of papers and easy search functionality saved me so much time!",
      author: "Priya Sharma",
      role: "Computer Science Student"
    },
    {
      text: "Amazing platform with comprehensive resources. The download feature works flawlessly and the papers are high quality.",
      author: "Rahul Kumar",
      role: "Mechanical Engineering Student"
    },
    {
      text: "I found papers from the last 10 years for my branch. This platform is incredibly helpful for exam preparation.",
      author: "Anjali Reddy",
      role: "Electronics Engineering Student"
    },
    {
      text: "The user interface is intuitive and the search filters make finding specific papers so easy. Highly recommended!",
      author: "Arjun Patel",
      role: "Civil Engineering Student"
    }
  ];

  return (
    <div>
      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Exam Store?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the features that make us the preferred choice for thousands of students
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-blue-100"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-gray-800">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Join thousands of students who trust Exam Store for their academic success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <p className="text-white text-lg leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-300 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      {testimonial.author}
                    </div>
                    <div className="text-blue-200 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">Ready to Ace Your Exams?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join Exam Store today and access thousands of previous year question papers to boost your exam preparation!
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Features;
