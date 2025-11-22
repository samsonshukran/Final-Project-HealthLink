import React, { useState } from 'react'

const Forum = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Best foods for increasing breast milk supply',
      author: 'Sarah M.',
      date: '2024-01-15',
      content: 'I\'ve been struggling with my milk supply lately. What foods or remedies have worked for other mothers? Looking for natural ways to boost production.',
      category: 'Breastfeeding',
      replies: 12,
      likes: 24,
      userAvatar: '👩'
    },
    {
      id: 2,
      title: 'Sleep regression at 4 months - any advice?',
      author: 'Grace W.',
      date: '2024-01-14',
      content: 'My 4-month-old was sleeping through the night but suddenly started waking up every 2 hours. Is this normal? How long does it typically last?',
      category: 'Sleep',
      replies: 8,
      likes: 15,
      userAvatar: '👸'
    },
    {
      id: 3,
      title: 'Recommended pediatricians in Kilifi area',
      author: 'Amina K.',
      date: '2024-01-13',
      content: 'Looking for a good pediatrician for my newborn. Preferably someone who is patient and good with first-time mothers. Any recommendations?',
      category: 'Healthcare',
      replies: 5,
      likes: 11,
      userAvatar: '👩‍⚕️'
    }
  ])

  const [newPost, setNewPost] = useState({ 
    title: '', 
    content: '', 
    category: 'general' 
  })
  const [showForm, setShowForm] = useState(false)

  const addPost = () => {
    if (newPost.title && newPost.content) {
      const post = {
        id: posts.length + 1,
        title: newPost.title,
        author: 'You',
        date: new Date().toISOString().split('T')[0],
        content: newPost.content,
        category: newPost.category,
        replies: 0,
        likes: 0,
        userAvatar: '👤'
      }
      setPosts([post, ...posts])
      setNewPost({ title: '', content: '', category: 'general' })
      setShowForm(false)
    }
  }

  const categories = [
    { value: 'pregnancy', label: 'Pregnancy', color: 'bg-pink-100 text-pink-800' },
    { value: 'breastfeeding', label: 'Breastfeeding', color: 'bg-blue-100 text-blue-800' },
    { value: 'sleep', label: 'Sleep', color: 'bg-purple-100 text-purple-800' },
    { value: 'nutrition', label: 'Nutrition', color: 'bg-green-100 text-green-800' },
    { value: 'healthcare', label: 'Healthcare', color: 'bg-red-100 text-red-800' },
    { value: 'general', label: 'General', color: 'bg-gray-100 text-gray-800' },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-title">Mothers Community Forum</h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Connect with other mothers, share experiences, and get support from our caring community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Categories & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* New Post Button */}
            <button 
              className="btn btn-primary w-full py-4 text-lg font-medium"
              onClick={() => setShowForm(true)}
            >
              + New Discussion
            </button>

            {/* Categories */}
            <div className="card p-6">
              <h3 className="subsection-title">Categories</h3>
              <div className="space-y-2 mt-4">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-neutral-50 ${
                      newPost.category === category.value ? 'bg-primary-50 text-primary-700' : ''
                    }`}
                    onClick={() => setNewPost({...newPost, category: category.value})}
                  >
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 ${category.color}`}>
                      {category.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Community Stats */}
            <div className="card p-6">
              <h3 className="subsection-title">Community Stats</h3>
              <div className="space-y-3 mt-4">
                <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                  <span className="text-neutral-700">Active Members</span>
                  <span className="font-semibold text-neutral-900">1,247</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                  <span className="text-neutral-700">Discussions</span>
                  <span className="font-semibold text-neutral-900">589</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                  <span className="text-neutral-700">Replies Today</span>
                  <span className="font-semibold text-neutral-900">42</span>
                </div>
              </div>
            </div>

            {/* Popular Tags */}
            <div className="card p-6">
              <h3 className="subsection-title">Popular Topics</h3>
              <div className="flex flex-wrap gap-2 mt-4">
                {['Newborn Care', 'Sleep Training', 'Weaning', 'Vaccinations', 'Postpartum', 'Self Care'].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary-100 text-secondary-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Posts & Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* New Post Form */}
            {showForm && (
              <div className="card p-6 slide-up">
                <h3 className="subsection-title">Start New Discussion</h3>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="form-label">Discussion Title</label>
                    <input 
                      type="text" 
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      className="form-input"
                      placeholder="What would you like to discuss?"
                    />
                  </div>
                  <div>
                    <label className="form-label">Category</label>
                    <select 
                      value={newPost.category}
                      onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                      className="form-input"
                    >
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Your Question or Story</label>
                    <textarea 
                      rows={6}
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      className="form-input"
                      placeholder="Share your experience or ask your question..."
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button 
                      className="btn btn-primary flex-1"
                      onClick={addPost}
                    >
                      Post Discussion
                    </button>
                    <button 
                      className="btn btn-ghost"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Posts List */}
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="card p-6 hover:shadow-medium transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    {/* User Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0">
                      {post.userAvatar}
                    </div>
                    
                    {/* Post Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-neutral-900 mb-1 hover:text-primary-600 cursor-pointer transition-colors duration-200">
                            {post.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-neutral-500">
                            <span>By {post.author}</span>
                            <span>•</span>
                            <span>{new Date(post.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          categories.find(c => c.value === post.category)?.color || 'bg-gray-100 text-gray-800'
                        }`}>
                          {categories.find(c => c.value === post.category)?.label || 'General'}
                        </span>
                      </div>
                      
                      <p className="text-neutral-700 mb-4 leading-relaxed">
                        {post.content}
                      </p>
                      
                      <div className="flex items-center space-x-6 text-sm text-neutral-500">
                        <button className="flex items-center space-x-1 hover:text-primary-600 transition-colors duration-200">
                          <span>💬</span>
                          <span>{post.replies} replies</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-red-600 transition-colors duration-200">
                          <span>❤️</span>
                          <span>{post.likes} likes</span>
                        </button>
                        <button className="hover:text-secondary-600 transition-colors duration-200">
                          Share
                        </button>
                        <button className="hover:text-accent-600 transition-colors duration-200">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <button className="btn btn-outline px-8">
                Load More Discussions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forum