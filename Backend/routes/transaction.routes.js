const express = require('express');
const router = express.Router();
const { getStudentTransactions, issueBook, returnBook } = require('../controllers/transaction.controller');
const { protect } = require('../middleware/auth.middleware');

// Student routes
router.get('/student', protect, getStudentTransactions);

// Librarian/POS routes
router.post('/issue', protect, issueBook);
router.post('/return', protect, returnBook);

module.exports = router;
