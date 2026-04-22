const express = require('express');
const router = express.Router();
const { getStudentTransactions } = require('../controllers/transaction.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/student', protect, getStudentTransactions);

module.exports = router;
