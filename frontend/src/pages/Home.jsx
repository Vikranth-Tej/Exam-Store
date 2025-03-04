import React from 'react'

const Home = () => {
  return (
    <div className="relative bg-[#0A0A1E] text-white min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Glowing Elements */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-500 opacity-50 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-pink-500 opacity-50 blur-3xl rounded-full animate-pulse"></div>
      
      {/* Content */}
      <div className="relative text-center">
        <h1 className="text-4xl font-bold">This is Home page</h1>
        <p className="mt-4 text-lg text-gray-300">Ace Every Exam with Past Papers at Your Fingertips!</p>
      </div>

    </div>
  )
}

export default Home
