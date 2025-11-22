const express = require('express');
const {
  getGrowthData,
  createGrowthRecord,
  addGrowthMeasurement,
  updateMilestone,
  addVaccination
} = require('../controllers/growthController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getGrowthData)
  .post(createGrowthRecord);

router.post('/measurements', addGrowthMeasurement);
router.put('/milestones/:id', updateMilestone);
router.post('/vaccinations', addVaccination);

module.exports = router;