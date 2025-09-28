import React, { useEffect } from 'react'
import Nav from './components/Nav'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import About from './pages/About'
import Papers from './pages/Papers'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import Footer from './components/Footer'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react"

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if(isCheckingAuth && !authUser) return(
    <div className='flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-blue-100'>
      <div className="text-center">
        <Loader className="size-12 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-blue-600 font-medium">Loading Exam Store...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Nav/>
      
      <main className="flex-grow">
        <Routes>
          <Route path='/' element={authUser ? <Home/> : <Navigate to="/login" />} />
          <Route path='/signup' element={!authUser ? <Signup/> : <Navigate to="/" />}/>
          <Route path='/login' element={!authUser ? <Login/> : <Navigate to="/" />}/>
          <Route path='/profile' element={authUser ? <Profile/> : <Navigate to="/login" />}/>
          <Route path='/papers' element={authUser ? <Papers/> : <Navigate to="/login" />}/>
          <Route path='/contact' element={authUser ? <Contact/> : <Navigate to="/login" />}/>
          <Route path='/about' element={authUser ? <About/> : <Navigate to="/login" />}/>
          <Route path='/admin' element={authUser ? <Admin/> : <Navigate to="/login" />}/>
        </Routes>
      </main>

      <Footer />
      <Toaster position="top-right" />
    </div>
  )
}

export default App