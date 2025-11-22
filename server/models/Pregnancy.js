const mongoose = require('mongoose')

const pregnancySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastPeriodDate: {
    type: Date,
    required: [true, 'Please add the first day of your last period']
  },
  dueDate: {
    type: Date
  },
  currentWeek: {
    type: Number,
    default: 1,
    min: [1, 'Week cannot be less than 1'],
    max: [42, 'Week cannot be more than 42']
  },
  weightMeasurements: [{
    date: {
      type: Date,
      default: Date.now
    },
    weight: {
      type: Number,
      required: true,
      min: [30, 'Weight cannot be less than 30kg'],
      max: [150, 'Weight cannot be more than 150kg']
    },
    week: Number,
    notes: String
  }],
  symptoms: [{
    date: {
      type: Date,
      default: Date.now
    },
    description: {
      type: String,
      required: true
    },
    severity: {
      type: String,
      enum: ['mild', 'moderate', 'severe'],
      default: 'mild'
    },
    notes: String
  }],
  appointments: [{
    date: Date,
    type: {
      type: String,
      required: true
    },
    location: String,
    doctor: String,
    notes: String,
    completed: {
      type: Boolean,
      default: false
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// Calculate due date before saving
pregnancySchema.pre('save', function(next) {
  if (this.lastPeriodDate && !this.dueDate) {
    const dueDate = new Date(this.lastPeriodDate)
    dueDate.setDate(dueDate.getDate() + 280) // 40 weeks
    this.dueDate = dueDate
  }

  // Calculate current week
  if (this.lastPeriodDate) {
    const today = new Date()
    const startDate = new Date(this.lastPeriodDate)
    const diffTime = Math.abs(today - startDate)
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7))
    this.currentWeek = Math.min(diffWeeks, 42)
  }
  next()
})

module.exports = mongoose.model('Pregnancy', pregnancySchema)