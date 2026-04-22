const express = require('express');
const router = express.Router();
const { getGlobalStats, getStudentStats, getLibraryStats } = require('../controllers/telemetry.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.get('/global', protect, authorize('admin', 'librarian'), getGlobalStats);
router.get('/student', protect, getStudentStats); // Allow all logged in users to see their stats
router.get('/library', protect, getLibraryStats);

module.exports = router;
