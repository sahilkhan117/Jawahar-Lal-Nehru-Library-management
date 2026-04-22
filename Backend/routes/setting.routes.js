const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/setting.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.use(protect, authorize('admin'));

router.get('/', getSettings);
router.put('/', updateSettings);

module.exports = router;
