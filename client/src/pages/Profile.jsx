import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { userAPI, profileAPI } from '../services/api'

const Profile = () => {
  const { user, updateUser } = useAuth()
  const [profile, setProfile] = useState(null)
  const [editing, setEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    children: '',
  })

  // Load user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        children: user.children?.toString() || '0',
      })
      loadProfile()
    }
  }, [user])

  const loadProfile = async () => {
    try {
      const response = await profileAPI.getProfile()
      setProfile(response.data.data)
    } catch (error) {
      console.error('Failed to load profile:', error)
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Update user data
      const userResponse = await userAPI.updateUser(user._id, {
        ...formData,
        children: parseInt(formData.children)
      })
      
      updateUser(userResponse.data.data)
      setEditing(false)
    } catch (error) {
      console.error('Failed to update profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const stats = [
    { label: 'Pregnancy Progress', value: '24 weeks', color: 'primary', icon: '🤰' },
    { label: 'Growth Records', value: '18 entries', color: 'secondary', icon: '📈' },
    { label: 'Feeding Sessions', value: '156 total', color: 'accent', icon: '🍼' },
    { label: 'Forum Posts', value: '7 discussions', color: 'green', icon: '💬' }
  ]

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner text-primary-500"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-title">My Profile</h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Manage your account, track your progress, and customize your experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Profile Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="card p-6 text-center">
              <div className="w-24 h-24 bg-gradient-health rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-glow">
                {user.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-1 font-display">{user.name}</h2>
              <p className="text-neutral-600 mb-4">Mother of {user.children}</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-primary-50 rounded-xl">
                  <span className="text-primary-700 font-medium">Member Since</span>
                  <span className="text-primary-700 font-bold text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="card p-6">
              <nav className="space-y-2">
                {[
                  { id: 'profile', label: 'Profile Info', icon: '👤' },
                  { id: 'progress', label: 'My Progress', icon: '📊' },
                  { id: 'settings', label: 'Settings', icon: '⚙️' },
                  { id: 'notifications', label: 'Notifications', icon: '🔔' },
                  { id: 'help', label: 'Help & Support', icon: '❓' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center space-x-3 ${
                      activeTab === tab.id 
                        ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500' 
                        : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card group hover:shadow-medium transition-all duration-300 text-center">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className={`text-2xl font-bold mb-1 font-display ${
                    stat.color === 'primary' ? 'text-primary-600' :
                    stat.color === 'secondary' ? 'text-secondary-600' :
                    stat.color === 'accent' ? 'text-accent-600' : 'text-green-600'
                  }`}>
                    {stat.value}
                  </div>
                  <div className="text-neutral-600 font-medium text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Profile Information */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="subsection-title">Personal Information</h3>
                <button 
                  className="btn btn-outline"
                  onClick={() => setEditing(!editing)}
                  disabled={isLoading}
                >
                  {editing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Full Name</label>
                  {editing ? (
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="form-input"
                      disabled={isLoading}
                    />
                  ) : (
                    <div className="p-3 bg-neutral-50 rounded-xl text-neutral-900 font-medium">
                      {user.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="form-label">Email Address</label>
                  {editing ? (
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="form-input"
                      disabled={isLoading}
                    />
                  ) : (
                    <div className="p-3 bg-neutral-50 rounded-xl text-neutral-900 font-medium">
                      {user.email}
                    </div>
                  )}
                </div>

                <div>
                  <label className="form-label">Location</label>
                  {editing ? (
                    <input 
                      type="text" 
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="form-input"
                      disabled={isLoading}
                    />
                  ) : (
                    <div className="p-3 bg-neutral-50 rounded-xl text-neutral-900 font-medium">
                      {user.location}
                    </div>
                  )}
                </div>

                <div>
                  <label className="form-label">Phone Number</label>
                  {editing ? (
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="form-input"
                      disabled={isLoading}
                    />
                  ) : (
                    <div className="p-3 bg-neutral-50 rounded-xl text-neutral-900 font-medium">
                      {user.phone}
                    </div>
                  )}
                </div>

                <div>
                  <label className="form-label">Number of Children</label>
                  {editing ? (
                    <input 
                      type="number" 
                      value={formData.children}
                      onChange={(e) => setFormData({...formData, children: e.target.value})}
                      className="form-input"
                      min="0"
                      disabled={isLoading}
                    />
                  ) : (
                    <div className="p-3 bg-neutral-50 rounded-xl text-neutral-900 font-medium">
                      {user.children}
                    </div>
                  )}
                </div>
              </div>

              {editing && (
                <div className="flex space-x-3 mt-6">
                  <button 
                    className="btn btn-primary disabled:opacity-50"
                    onClick={handleSave}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button 
                    className="btn btn-ghost"
                    onClick={() => setEditing(false)}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile