import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuth()

  const isActive = (path) => location.pathname === path

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/pregnancy', label: 'Pregnancy', icon: '🤰' },
    { path: '/growth', label: 'Growth', icon: '📈' },
    { path: '/feeding', label: 'Feeding', icon: '🍼' },
    { path: '/forum', label: 'Forum', icon: '💬' },
  ]

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-soft glass-effect sticky top-0 z-50 border-b border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-health rounded-2xl flex items-center justify-center shadow-glow group-hover:shadow-glow-blue transition-all duration-300">
              <span className="text-white font-bold text-xl">HL</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text font-display">HealthLink</h1>
              <p className="text-xs text-neutral-500 font-medium">Kilifi</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive(item.path) 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'hover:bg-neutral-50'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className={`nav-link px-4 py-2 rounded-xl transition-all duration-200 ${
                    isActive('/profile') 
                      ? 'bg-primary-50 text-primary-600' 
                      : 'hover:bg-neutral-50'
                  }`}
                >
                  <span className="text-lg">👤</span>
                  <span className="font-medium">Profile</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="btn btn-ghost font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="btn btn-ghost font-medium"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-primary font-medium"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="btn btn-ghost p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar