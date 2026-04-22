const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const multer = require('multer');
const { getBooks, addSingleBook, bulkImportBooks } = require('../controllers/book.controller');
const { protect } = require('../middleware/auth.middleware'); // Assuming you have auth middleware

// Configure multer for CSV uploads (temporary local storage before parsing)
const upload = multer({ dest: 'uploads/' });

// Public/Protected routes depending on your needs. For now, we'll keep them open for testing
router.get('/', getBooks);
router.post('/', addSingleBook);
router.post('/bulk', upload.single('file'), bulkImportBooks);
=======
const { getAllBooks, getBookById } = require('../controllers/book.controller');
const { protect } = require('../middleware/auth.middleware');

// Publicly accessible if logged in
router.get('/', protect, getAllBooks);
router.get('/:id', protect, getBookById);

// Wishlist actions
router.post('/wishlist/:id', protect, require('../controllers/book.controller').toggleWishlist);
>>>>>>> 8d60695e8c8c6946e1ff86ca51546732c55fe18d

module.exports = router;
