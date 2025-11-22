const Profile = require('../models/Profile');

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
exports.getProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id })
      .populate('user', 'name email phone location children');

    if (!profile) {
      // Create default profile if doesn't exist
      profile = await Profile.create({
        user: req.user.id,
        emergencyContacts: [],
        healthConditions: [],
        medications: [],
        preferences: {
          language: 'en',
          notifications: {
            appointments: true,
            reminders: true,
            tips: true,
            forumReplies: true
          }
        }
      });
      await profile.populate('user', 'name email phone location children');
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const { emergencyContacts, healthConditions, medications, preferences, clinicInfo } = req.body;
    
    let profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      profile = await Profile.create({
        user: req.user.id,
        emergencyContacts,
        healthConditions,
        medications,
        preferences,
        clinicInfo
      });
    } else {
      profile.emergencyContacts = emergencyContacts || profile.emergencyContacts;
      profile.healthConditions = healthConditions || profile.healthConditions;
      profile.medications = medications || profile.medications;
      profile.preferences = preferences || profile.preferences;
      profile.clinicInfo = clinicInfo || profile.clinicInfo;

      await profile.save();
    }

    await profile.populate('user', 'name email phone location children');

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add emergency contact
// @route   POST /api/profile/emergency-contacts
// @access  Private
exports.addEmergencyContact = async (req, res, next) => {
  try {
    const { name, relationship, phone, isPrimary } = req.body;
    
    const profile = await Profile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    profile.emergencyContacts.push({ 
      name, 
      relationship, 
      phone, 
      isPrimary: isPrimary || false 
    });

    await profile.save();

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update emergency contact
// @route   PUT /api/profile/emergency-contacts/:contactId
// @access  Private
exports.updateEmergencyContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, relationship, phone, isPrimary } = req.body;
    
    const profile = await Profile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    const contact = profile.emergencyContacts.id(contactId);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Emergency contact not found'
      });
    }

    if (name) contact.name = name;
    if (relationship) contact.relationship = relationship;
    if (phone) contact.phone = phone;
    if (isPrimary !== undefined) contact.isPrimary = isPrimary;

    await profile.save();

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete emergency contact
// @route   DELETE /api/profile/emergency-contacts/:contactId
// @access  Private
exports.deleteEmergencyContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    
    const profile = await Profile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    profile.emergencyContacts = profile.emergencyContacts.filter(
      contact => contact._id.toString() !== contactId
    );

    await profile.save();

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add health condition
// @route   POST /api/profile/health-conditions
// @access  Private
exports.addHealthCondition = async (req, res, next) => {
  try {
    const { condition, diagnosedDate, severity, notes } = req.body;
    
    const profile = await Profile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    profile.healthConditions.push({
      condition,
      diagnosedDate,
      severity,
      notes,
      isActive: true
    });

    await profile.save();

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update health condition
// @route   PUT /api/profile/health-conditions/:conditionId
// @access  Private
exports.updateHealthCondition = async (req, res, next) => {
  try {
    const { conditionId } = req.params;
    const { condition, diagnosedDate, severity, notes, isActive } = req.body;
    
    const profile = await Profile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    const healthCondition = profile.healthConditions.id(conditionId);
    if (!healthCondition) {
      return res.status(404).json({
        success: false,
        message: 'Health condition not found'
      });
    }

    if (condition) healthCondition.condition = condition;
    if (diagnosedDate) healthCondition.diagnosedDate = diagnosedDate;
    if (severity) healthCondition.severity = severity;
    if (notes) healthCondition.notes = notes;
    if (isActive !== undefined) healthCondition.isActive = isActive;

    await profile.save();

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add medication
// @route   POST /api/profile/medications
// @access  Private
exports.addMedication = async (req, res, next) => {
  try {
    const { name, dosage, frequency, purpose, startDate, endDate, prescribingDoctor } = req.body;
    
    const profile = await Profile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    profile.medications.push({
      name,
      dosage,
      frequency,
      purpose,
      startDate,
      endDate,
      prescribingDoctor
    });

    await profile.save();

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};