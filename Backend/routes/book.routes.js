const express = require('express');
const router = express.Router();
const multer = require('multer');
const { 
  getAllBooks, 
  getBookById, 
  toggleWishlist, 
  addSingleBook, 
  bulkImportBooks 
} = require('../controllers/book.controller');
const { protect } = require('../middleware/auth.middleware');

// Configure multer for CSV uploads
const upload = multer({ dest: 'uploads/' });

// Public/Student routes
router.get('/', protect, getAllBooks);
router.get('/:id', protect, getBookById);
router.post('/wishlist/:id', protect, toggleWishlist);

// Librarian/Admin routes
router.post('/', protect, addSingleBook);
router.post('/bulk', protect, upload.single('file'), bulkImportBooks);

module.exports = router;
