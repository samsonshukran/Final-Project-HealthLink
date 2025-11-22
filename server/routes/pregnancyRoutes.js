const express = require('express');
const {
  getPregnancyInfo,
  createPregnancyInfo,
  updatePregnancyInfo,
  addWeightMeasurement,
  addSymptom,
  addAppointment
} = require('../controllers/pregnancyController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getPregnancyInfo)
  .post(createPregnancyInfo)
  .put(updatePregnancyInfo);

router.post('/weight', addWeightMeasurement);
router.post('/symptoms', addSymptom);
router.post('/appointments', addAppointment);

module.exports = router;