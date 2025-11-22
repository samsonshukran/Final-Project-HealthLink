const Pregnancy = require('../models/Pregnancy');

// @desc    Get pregnancy information
// @route   GET /api/pregnancy
// @access  Private
exports.getPregnancyInfo = async (req, res, next) => {
  try {
    const pregnancy = await Pregnancy.findOne({ user: req.user.id });
    
    if (!pregnancy) {
      return res.status(200).json({
        success: true,
        data: null,
        message: 'No pregnancy information found'
      });
    }

    res.status(200).json({
      success: true,
      data: pregnancy
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create pregnancy information
// @route   POST /api/pregnancy
// @access  Private
exports.createPregnancyInfo = async (req, res, next) => {
  try {
    const { lastPeriodDate } = req.body;
    
    // Check if pregnancy info already exists
    const existingPregnancy = await Pregnancy.findOne({ user: req.user.id });
    if (existingPregnancy) {
      return res.status(400).json({
        success: false,
        message: 'Pregnancy information already exists'
      });
    }

    const pregnancy = await Pregnancy.create({
      user: req.user.id,
      lastPeriodDate
    });

    res.status(201).json({
      success: true,
      data: pregnancy
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update pregnancy information
// @route   PUT /api/pregnancy
// @access  Private
exports.updatePregnancyInfo = async (req, res, next) => {
  try {
    const { lastPeriodDate, currentWeek } = req.body;
    
    let pregnancy = await Pregnancy.findOne({ user: req.user.id });
    
    if (!pregnancy) {
      return res.status(404).json({
        success: false,
        message: 'Pregnancy information not found'
      });
    }

    pregnancy = await Pregnancy.findByIdAndUpdate(
      pregnancy._id,
      { lastPeriodDate, currentWeek },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: pregnancy
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add weight measurement
// @route   POST /api/pregnancy/weight
// @access  Private
exports.addWeightMeasurement = async (req, res, next) => {
  try {
    const { date, weight, week, notes } = req.body;
    
    let pregnancy = await Pregnancy.findOne({ user: req.user.id });
    
    if (!pregnancy) {
      return res.status(404).json({
        success: false,
        message: 'Pregnancy information not found'
      });
    }

    pregnancy.weightMeasurements.push({
      date: date || new Date(),
      weight,
      week,
      notes
    });

    await pregnancy.save();

    res.status(200).json({
      success: true,
      data: pregnancy
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add symptom
// @route   POST /api/pregnancy/symptoms
// @access  Private
exports.addSymptom = async (req, res, next) => {
  try {
    const { date, description, severity, notes } = req.body;
    
    let pregnancy = await Pregnancy.findOne({ user: req.user.id });
    
    if (!pregnancy) {
      return res.status(404).json({
        success: false,
        message: 'Pregnancy information not found'
      });
    }

    pregnancy.symptoms.push({
      date: date || new Date(),
      description,
      severity,
      notes
    });

    await pregnancy.save();

    res.status(200).json({
      success: true,
      data: pregnancy
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add appointment
// @route   POST /api/pregnancy/appointments
// @access  Private
exports.addAppointment = async (req, res, next) => {
  try {
    const { date, type, location, doctor, notes } = req.body;
    
    let pregnancy = await Pregnancy.findOne({ user: req.user.id });
    
    if (!pregnancy) {
      return res.status(404).json({
        success: false,
        message: 'Pregnancy information not found'
      });
    }

    pregnancy.appointments.push({
      date,
      type,
      location,
      doctor,
      notes
    });

    await pregnancy.save();

    res.status(200).json({
      success: true,
      data: pregnancy
    });
  } catch (error) {
    next(error);
  }
};