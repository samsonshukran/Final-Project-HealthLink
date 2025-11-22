const express = require('express');
const {
  getProfile,
  updateProfile,
  addEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact,
  addHealthCondition,
  updateHealthCondition,
  addMedication
} = require('../controllers/profileController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getProfile)
  .put(updateProfile);

router.route('/emergency-contacts')
  .post(addEmergencyContact);

router.route('/emergency-contacts/:contactId')
  .put(updateEmergencyContact)
  .delete(deleteEmergencyContact);

router.route('/health-conditions')
  .post(addHealthCondition);

router.route('/health-conditions/:conditionId')
  .put(updateHealthCondition);

router.post('/medications', addMedication);

module.exports = router;