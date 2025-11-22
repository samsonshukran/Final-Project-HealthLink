import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import PregnancyTracker from './pages/PregnancyTracker'
import GrowthTracker from './pages/GrowthTracker'
import FeedingTimer from './pages/FeedingTimer'
import Forum from './pages/Forum'
import Profile from './pages/Profile'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

function App() {
  // Check if user is authenticated
  const isAuthenticated = !!localStorage.getItem('token')

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          {/* Conditionally render Navbar - don't show on auth pages */}
          {!window.location.pathname.includes('/login') && 
           !window.location.pathname.includes('/register') && <Navbar />}
          
          <main className="flex-grow">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={!isAuthenticated ? <LoginForm /> : <Navigate to="/" />} />
              <Route path="/register" element={!isAuthenticated ? <RegisterForm /> : <Navigate to="/" />} />
              
              {/* Protected routes */}
              <Route path="/pregnancy" element={isAuthenticated ? <PregnancyTracker /> : <Navigate to="/login" />} />
              <Route path="/growth" element={isAuthenticated ? <GrowthTracker /> : <Navigate to="/login" />} />
              <Route path="/feeding" element={isAuthenticated ? <FeedingTimer /> : <Navigate to="/login" />} />
              <Route path="/forum" element={isAuthenticated ? <Forum /> : <Navigate to="/login" />} />
              <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
              
              {/* Redirect to home for unknown routes */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          
          {/* Conditionally render Footer - don't show on auth pages */}
          {!window.location.pathname.includes('/login') && 
           !window.location.pathname.includes('/register') && <Footer />}
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App