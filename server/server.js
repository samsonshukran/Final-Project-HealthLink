const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/pregnancy', require('./routes/pregnancyRoutes'))
app.use('/api/growth', require('./routes/growthRoutes'))
app.use('/api/feeding', require('./routes/feedingRoutes'))
app.use('/api/forum', require('./routes/forumRoutes'))
app.use('/api/profile', require('./routes/profileRoutes'))

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/healthlink-kilifi')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err))

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'HealthLink Kilifi API is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  })
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  })
})

// Error handling middleware
app.use(require('./middleware/errorMiddleware'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`)
  console.log(`📱 HealthLink API: http://localhost:${PORT}`)
  console.log(`❤️  Health Check: http://localhost:${PORT}/api/health`)
})