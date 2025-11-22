const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  
  // Personal Information
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', 'Prefer not to say'],
    required: false
  },
  maritalStatus: {
    type: String,
    enum: ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'],
    required: false
  },
  dateOfBirth: {
    type: Date,
    required: false
  },
  idNumber: {
    type: String,
    required: false
  },
  
  // Location Information
  county: {
    type: String,
    required: false
  },
  subCounty: {
    type: String,
    required: false
  },
  ward: {
    type: String,
    required: false
  },
  village: {
    type: String,
    required: false
  },
  
  // Contact Information
  phone: {
    type: String,
    required: false
  },
  
  // Medical Information
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'],
    required: false
  },
  chronicConditions: [{
    type: String
  }],
  allergies: {
    type: String,
    required: false
  },
  
  // Maternal & Child Health Information
  isPregnant: {
    type: String,
    enum: ['yes', 'no'],
    required: false
  },
  numberOfChildren: {
    type: Number,
    default: 0
  },
  childrenAgeBrackets: [{
    type: String
  }],
  
  // System Information
  role: {
    type: String,
    enum: ['user', 'admin', 'health_worker'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);