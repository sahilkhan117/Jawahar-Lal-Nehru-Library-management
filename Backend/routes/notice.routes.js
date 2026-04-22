const express = require('express');
const router = express.Router();
const { createNotice, getNotices } = require('../controllers/notice.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// Public/Student routes
router.get('/', protect, getNotices);

// Admin only routes
router.post('/', protect, authorize('admin'), createNotice);

module.exports = router;
