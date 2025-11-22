const mongoose = require('mongoose')

const growthSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  childName: {
    type: String,
    required: [true, 'Please add child name'],
    trim: true
  },
  birthDate: {
    type: Date,
    required: [true, 'Please add birth date']
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  measurements: [{
    date: {
      type: Date,
      default: Date.now
    },
    ageInMonths: Number,
    weight: {
      type: Number,
      required: true,
      min: [0.5, 'Weight cannot be less than 0.5kg'],
      max: [30, 'Weight cannot be more than 30kg']
    },
    height: {
      type: Number,
      required: true,
      min: [30, 'Height cannot be less than 30cm'],
      max: [120, 'Height cannot be more than 120cm']
    },
    headCircumference: {
      type: Number,
      min: [20, 'Head circumference cannot be less than 20cm'],
      max: [60, 'Head circumference cannot be more than 60cm']
    },
    notes: String
  }],
  milestones: [{
    milestone: {
      type: String,
      required: true
    },
    expectedAge: String,
    achieved: {
      type: Boolean,
      default: false
    },
    achievedDate: Date,
    notes: String
  }],
  vaccinations: [{
    vaccine: {
      type: String,
      required: true
    },
    scheduledDate: Date,
    administeredDate: Date,
    status: {
      type: String,
      enum: ['scheduled', 'administered', 'missed'],
      default: 'scheduled'
    },
    notes: String
  }]
}, {
  timestamps: true
})

// Calculate age in months for each measurement
growthSchema.pre('save', function(next) {
  this.measurements.forEach(measurement => {
    const birthDate = new Date(this.birthDate)
    const measureDate = new Date(measurement.date)
    const diffMonths = (measureDate.getFullYear() - birthDate.getFullYear()) * 12 + 
                      (measureDate.getMonth() - birthDate.getMonth())
    measurement.ageInMonths = diffMonths
  })
  next()
})

module.exports = mongoose.model('Growth', growthSchema)