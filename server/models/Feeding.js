const mongoose = require('mongoose')

const feedingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  childName: {
    type: String,
    required: true
  },
  sessions: [{
    startTime: {
      type: Date,
      required: true,
      default: Date.now
    },
    endTime: Date,
    duration: Number, // in minutes
    type: {
      type: String,
      enum: ['breastfeeding', 'formula', 'solid_food'],
      required: true
    },
    side: {
      type: String,
      enum: ['left', 'right', 'both', 'none']
    },
    amount: {
      type: Number, // in ml for liquid, grams for solid
      min: 0
    },
    foodType: String, // for solid food
    notes: String
  }],
  preferences: {
    feedingSchedule: String,
    allergies: [String],
    favoriteFoods: [String]
  }
}, {
  timestamps: true
})

// Calculate duration before saving
feedingSchema.pre('save', function(next) {
  this.sessions.forEach(session => {
    if (session.endTime && session.startTime) {
      session.duration = Math.round((session.endTime - session.startTime) / (1000 * 60))
    }
  })
  next()
})

module.exports = mongoose.model('Feeding', feedingSchema)