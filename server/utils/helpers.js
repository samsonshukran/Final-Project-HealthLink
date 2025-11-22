// Calculate pregnancy week based on last period date
exports.calculatePregnancyWeek = (lastPeriodDate) => {
  const today = new Date()
  const startDate = new Date(lastPeriodDate)
  const diffTime = Math.abs(today - startDate)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.floor(diffDays / 7)
}

// Calculate age in months
exports.calculateAgeInMonths = (birthDate) => {
  const today = new Date()
  const birth = new Date(birthDate)
  let months = (today.getFullYear() - birth.getFullYear()) * 12
  months -= birth.getMonth()
  months += today.getMonth()
  return months <= 0 ? 0 : months
}

// Format date for display
exports.formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// Validate phone number
exports.validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s-()]{10,}$/
  return phoneRegex.test(phone)
}

// Generate random color for avatars
exports.generateColor = () => {
  const colors = [
    '#2E8B57', '#36abf6', '#ff8a3c', '#9b59b6', '#e74c3c', '#f39c12', '#1abc9c'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

// Calculate feeding statistics
exports.calculateFeedingStats = (sessions) => {
  const today = new Date().toISOString().split('T')[0]
  const todaySessions = sessions.filter(session => 
    new Date(session.startTime).toISOString().split('T')[0] === today
  )
  
  const totalDuration = todaySessions.reduce((total, session) => total + (session.duration || 0), 0)
  const averageDuration = todaySessions.length > 0 ? totalDuration / todaySessions.length : 0
  
  return {
    sessionsToday: todaySessions.length,
    totalDurationToday: totalDuration,
    averageDuration: Math.round(averageDuration)
  }
}