import React, { useEffect } from 'react'
import Nav from './components/Nav'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import About from './pages/About'
import Footer from './components/Footer'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'
import { Toaster } from "react-hot-toast";

import { Loader } from "lucide-react"
import Contact from './pages/Contact'

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  useEffect(() => {
    checkAuth();
  }
  , [checkAuth]);

  console.log({authUser});

  if(isCheckingAuth && !authUser) return(
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin" />
    </div>
  )

  return (
    <div>
      <Nav/>

      <Routes>
        <Route path='/' element={authUser ? <Home/> : <Navigate to="/login" />} />
        <Route path='/signup' element={!authUser ? <Signup/> : <Navigate to="/" />}/>
        <Route path='/login' element={!authUser ? <Login/> : <Navigate to="/" />}/>
        <Route path='/profile' element={authUser ? <Profile/> : <Navigate to="/login" />}/>
        <Route path='/contact' element={authUser ? <Contact/> : <Navigate to="/login" />}/>
        <Route path='/about' element={authUser ? <About/> : <Navigate to="/login" />}/>
      </Routes>

      <Footer />

      <Toaster />
    </div>
  )
}

export default App
