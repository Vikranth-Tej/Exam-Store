import React from 'react';
import { BookOpen, Users, Award, Target, Heart, Lightbulb } from 'lucide-react';

const About = () => {
  const teamMembers = [
    
    
    {
      name: "Chintalapati Jayanth",
      role: "Founder ",
      image: "",
      bio: "NITW UG ."
    },
    {
      name: "Pailla Sai Vikranth Tej",
      role: "Co-Founder ",
      image: "",
      bio: "NITW UG ."
    },
    
  ];

  const values = [
    {
      icon: BookOpen,
      title: "Academic Excellence",
      description: "We believe in providing the highest quality educational resources to help students achieve their academic goals."
    },
    {
      icon: Users,
      title: "Student-Centric",
      description: "Every decision we make is focused on improving the student experience and learning outcomes."
    },
    {
      icon: Heart,
      title: "Accessibility",
      description: "Quality education should be accessible to everyone, regardless of their background or location."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously innovate to bring the latest technology and methods to education."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Exam Store</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Empowering students with comprehensive educational resources and previous year question papers 
            to excel in their academic journey since 2020.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At Exam Store, we're dedicated to democratizing access to quality educational resources. 
                Our mission is to provide students with comprehensive collections of previous year question papers, 
                study materials, and expert guidance to help them succeed in their academic pursuits.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that every student deserves access to the best preparation materials, 
                regardless of their location or economic background. Through our platform, we're 
                building a community of learners who support each other's growth and success.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">50,000+</div>
                  <div className="text-gray-600">Students Helped</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">2,500+</div>
                  <div className="text-gray-600">Question Papers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
                  <div className="text-gray-600">Universities</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                  <div className="text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These values guide everything we do and shape our commitment to educational excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate educators and technologists working together to transform learning
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-blue-100 leading-relaxed">
                <p>
                  Exam Store was born out of a simple observation: students across India were struggling 
                  to find quality previous year question papers and study materials. Traditional methods 
                  were time-consuming, expensive, and often unreliable.
                </p>
                <p>
                  Founded in 2020 by a team of educators and technology enthusiasts from NIT Warangal, 
                  we set out to create a comprehensive platform that would make quality educational 
                  resources accessible to every student.
                </p>
                <p>
                  Today, we're proud to serve over 50,000 students across 150+ universities, 
                  helping them achieve their academic goals and build successful careers.
                </p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Our Journey</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-blue-800 font-bold">
                    2020
                  </div>
                  <div>
                    <div className="font-semibold">Founded</div>
                    <div className="text-blue-100 text-sm">Platform launched with 100 papers</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-blue-800 font-bold">
                    2022
                  </div>
                  <div>
                    <div className="font-semibold">Growth</div>
                    <div className="text-blue-100 text-sm">Reached 10,000+ students</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-blue-800 font-bold">
                    2024
                  </div>
                  <div>
                    <div className="font-semibold">Expansion</div>
                    <div className="text-blue-100 text-sm">50,000+ students, 150+ universities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Join Our Mission</h2>
          <p className="text-xl text-gray-600 mb-8">
            Be part of our community and help us make quality education accessible to everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              Start Learning Today
            </button>
            <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
