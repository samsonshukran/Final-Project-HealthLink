const Feeding = require('../models/Feeding');

// @desc    Get feeding data
// @route   GET /api/feeding
// @access  Private
exports.getFeedingData = async (req, res, next) => {
  try {
    const feedingData = await Feeding.find({ user: req.user.id });
    
    res.status(200).json({
      success: true,
      data: feedingData
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Start feeding session
// @route   POST /api/feeding/start
// @access  Private
exports.startFeedingSession = async (req, res, next) => {
  try {
    const { childName, type, side } = req.body;
    
    let feedingRecord = await Feeding.findOne({ 
      user: req.user.id, 
      childName 
    });

    if (!feedingRecord) {
      feedingRecord = await Feeding.create({
        user: req.user.id,
        childName,
        sessions: []
      });
    }

    const session = {
      startTime: new Date(),
      type,
      side: side || 'none'
    };

    feedingRecord.sessions.push(session);
    await feedingRecord.save();

    res.status(201).json({
      success: true,
      data: { 
        sessionId: session._id,
        feedingRecord 
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    End feeding session
// @route   PUT /api/feeding/end/:sessionId
// @access  Private
exports.endFeedingSession = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const { notes } = req.body;
    
    const feedingRecord = await Feeding.findOne({ 
      user: req.user.id
    });

    if (!feedingRecord) {
      return res.status(404).json({
        success: false,
        message: 'Feeding record not found'
      });
    }

    const session = feedingRecord.sessions.id(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    session.endTime = new Date();
    session.duration = Math.round((session.endTime - session.startTime) / (1000 * 60));
    if (notes) session.notes = notes;

    await feedingRecord.save();

    res.status(200).json({
      success: true,
      data: feedingRecord
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update feeding preferences
// @route   PUT /api/feeding/preferences
// @access  Private
exports.updateFeedingPreferences = async (req, res, next) => {
  try {
    const { childName, feedingSchedule, allergies, favoriteFoods } = req.body;
    
    let feedingRecord = await Feeding.findOne({ 
      user: req.user.id, 
      childName 
    });

    if (!feedingRecord) {
      feedingRecord = await Feeding.create({
        user: req.user.id,
        childName,
        preferences: {
          feedingSchedule,
          allergies: allergies || [],
          favoriteFoods: favoriteFoods || []
        }
      });
    } else {
      feedingRecord.preferences = {
        feedingSchedule: feedingSchedule || feedingRecord.preferences.feedingSchedule,
        allergies: allergies || feedingRecord.preferences.allergies,
        favoriteFoods: favoriteFoods || feedingRecord.preferences.favoriteFoods
      };
      
      await feedingRecord.save();
    }

    res.status(200).json({
      success: true,
      data: feedingRecord
    });
  } catch (error) {
    next(error);
  }
};