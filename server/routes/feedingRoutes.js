const express = require('express');
const {
  getFeedingData,
  startFeedingSession,
  endFeedingSession,
  updateFeedingPreferences
} = require('../controllers/feedingController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/', getFeedingData);
router.post('/start', startFeedingSession);
router.put('/end/:sessionId', endFeedingSession);
router.put('/preferences', updateFeedingPreferences);

module.exports = router;