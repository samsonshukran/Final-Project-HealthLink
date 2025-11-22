import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import PregnancyTracker from './pages/PregnancyTracker'
import GrowthTracker from './pages/GrowthTracker'
import FeedingTimer from './pages/FeedingTimer'
import Forum from './pages/Forum'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50/30 via-white to-secondary-50/30">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pregnancy" element={<PregnancyTracker />} />
              <Route path="/growth" element={<GrowthTracker />} />
              <Route path="/feeding" element={<FeedingTimer />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App