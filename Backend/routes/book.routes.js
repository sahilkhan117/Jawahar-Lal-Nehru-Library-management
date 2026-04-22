const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getBooks, addSingleBook, bulkImportBooks } = require('../controllers/book.controller');
const { protect } = require('../middleware/auth.middleware'); // Assuming you have auth middleware

// Configure multer for CSV uploads (temporary local storage before parsing)
const upload = multer({ dest: 'uploads/' });

// Public/Protected routes depending on your needs. For now, we'll keep them open for testing
router.get('/', getBooks);
router.post('/', addSingleBook);
router.post('/bulk', upload.single('file'), bulkImportBooks);

module.exports = router;
