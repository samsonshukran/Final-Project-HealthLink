import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    children: user?.children || 0,
  });

  const stats = [
    { label: 'Pregnancy Progress', value: '24 weeks', color: 'primary', icon: '🤰' },
    { label: 'Growth Records', value: '18 entries', color: 'secondary', icon: '📈' },
    { label: 'Feeding Sessions', value: '156 total', color: 'accent', icon: '🍼' },
    { label: 'Forum Posts', value: '7 discussions', color: 'success', icon: '💬' },
  ];

  if (!user) return <div className="min-h-screen flex items-center justify-center text-primary-600 font-bold">Loading...</div>;

  return (
    <div className="min-h-screen py-8 bg-gradient-primary/10 animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-600 font-display animate-slide-up">My Profile</h1>
          <p className="text-neutral-600 mt-2">Manage your account, track your progress, and customize your experience</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl shadow-card p-6 text-center">
              <div className="w-24 h-24 bg-gradient-accent rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-glow">
                {user.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-1 font-display">{user.name}</h2>
              <p className="text-neutral-600 mb-4">Mother of {user.children}</p>
              <div className="flex items-center justify-between p-3 bg-primary-50 rounded-xl">
                <span className="text-primary-700 font-medium">Member Since</span>
                <span className="text-primary-700 font-bold text-sm">{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-card p-6">
              <nav className="space-y-2">
                {['profile', 'progress', 'settings', 'notifications', 'help'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`w-full text-left px-4 py-3 rounded-xl flex items-center space-x-3 transition-all duration-200 ${
                      activeTab === tab ? 'bg-gradient-primary text-white shadow-glow' : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <span className="text-lg">💡</span>
                    <span className="font-medium capitalize">{tab}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-4 rounded-3xl text-center shadow-card hover:shadow-glow transition-all">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className={`text-2xl font-bold mb-1 font-display ${
                    stat.color === 'primary' ? 'text-primary-600' :
                    stat.color === 'secondary' ? 'text-secondary-600' :
                    stat.color === 'accent' ? 'text-accent-600' : 'text-success-600'
                  }`}>{stat.value}</div>
                  <div className="text-neutral-600 font-medium text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Profile Info */}
            <div className="bg-white p-6 rounded-3xl shadow-card space-y-4">
              {['Name', 'Email', 'Phone', 'Location', 'Children'].map((field, idx) => (
                <div key={idx}>
                  <label className="block text-sm font-medium text-neutral-700">{field}</label>
                  <input
                    type={field === 'Email' ? 'email' : field === 'Children' ? 'number' : 'text'}
                    value={formData[field.toLowerCase()] || ''}
                    disabled={!editing}
                    onChange={e => setFormData({ ...formData, [field.toLowerCase()]: e.target.value })}
                    className="mt-1 block w-full rounded-xl border border-neutral-300 shadow-sm p-3 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                  />
                </div>
              ))}

              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => setEditing(!editing)}
                  className="px-6 py-2 rounded-xl font-medium bg-primary-500 text-white hover:bg-primary-600 transition"
                >
                  {editing ? 'Cancel' : 'Edit'}
                </button>
                {editing && (
                  <button
                    onClick={() => updateUser(formData)}
                    className="px-6 py-2 rounded-xl font-medium bg-accent-500 text-white hover:bg-accent-600 transition"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
