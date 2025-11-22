const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  emergencyContacts: [{
    name: {
      type: String,
      required: true
    },
    relationship: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  healthConditions: [{
    condition: {
      type: String,
      required: true
    },
    diagnosedDate: Date,
    severity: {
      type: String,
      enum: ['mild', 'moderate', 'severe']
    },
    notes: String,
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  medications: [{
    name: {
      type: String,
      required: true
    },
    dosage: String,
    frequency: String,
    purpose: String,
    startDate: Date,
    endDate: Date,
    prescribingDoctor: String
  }],
  preferences: {
    language: {
      type: String,
      default: 'en'
    },
    notifications: {
      appointments: { type: Boolean, default: true },
      reminders: { type: Boolean, default: true },
      tips: { type: Boolean, default: true },
      forumReplies: { type: Boolean, default: true }
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'light'
    }
  },
  clinicInfo: {
    name: String,
    location: String,
    phone: String,
    doctor: String,
    nextAppointment: Date
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Profile', profileSchema)