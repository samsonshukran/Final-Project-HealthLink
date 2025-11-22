const Growth = require('../models/Growth');

// @desc    Get growth data
// @route   GET /api/growth
// @access  Private
exports.getGrowthData = async (req, res, next) => {
  try {
    const growthData = await Growth.find({ user: req.user.id });
    
    res.status(200).json({
      success: true,
      data: growthData
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create growth record
// @route   POST /api/growth
// @access  Private
exports.createGrowthRecord = async (req, res, next) => {
  try {
    const { childName, birthDate, gender } = req.body;
    
    const growthRecord = await Growth.create({
      user: req.user.id,
      childName,
      birthDate,
      gender
    });

    res.status(201).json({
      success: true,
      data: growthRecord
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add growth measurement
// @route   POST /api/growth/measurements
// @access  Private
exports.addGrowthMeasurement = async (req, res, next) => {
  try {
    const { childName, date, weight, height, headCircumference, notes } = req.body;
    
    let growthRecord = await Growth.findOne({ 
      user: req.user.id, 
      childName 
    });

    if (!growthRecord) {
      return res.status(404).json({
        success: false,
        message: 'Growth record not found for this child'
      });
    }

    growthRecord.measurements.push({
      date: date || new Date(),
      weight,
      height,
      headCircumference,
      notes
    });

    await growthRecord.save();

    res.status(200).json({
      success: true,
      data: growthRecord
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update milestone
// @route   PUT /api/growth/milestones/:id
// @access  Private
exports.updateMilestone = async (req, res, next) => {
  try {
    const { achieved, achievedDate, notes } = req.body;
    
    const growthRecord = await Growth.findOne({ user: req.user.id });
    
    if (!growthRecord) {
      return res.status(404).json({
        success: false,
        message: 'Growth record not found'
      });
    }

    const milestone = growthRecord.milestones.id(req.params.id);
    if (!milestone) {
      return res.status(404).json({
        success: false,
        message: 'Milestone not found'
      });
    }

    milestone.achieved = achieved;
    if (achievedDate) milestone.achievedDate = achievedDate;
    if (notes) milestone.notes = notes;

    await growthRecord.save();

    res.status(200).json({
      success: true,
      data: growthRecord
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add vaccination
// @route   POST /api/growth/vaccinations
// @access  Private
exports.addVaccination = async (req, res, next) => {
  try {
    const { childName, vaccine, scheduledDate, administeredDate, status, notes } = req.body;
    
    let growthRecord = await Growth.findOne({ 
      user: req.user.id, 
      childName 
    });

    if (!growthRecord) {
      return res.status(404).json({
        success: false,
        message: 'Growth record not found for this child'
      });
    }

    growthRecord.vaccinations.push({
      vaccine,
      scheduledDate,
      administeredDate,
      status: status || 'scheduled',
      notes
    });

    await growthRecord.save();

    res.status(200).json({
      success: true,
      data: growthRecord
    });
  } catch (error) {
    next(error);
  }
};