const express = require('express');
const router = express.Router();
const multer = require('multer');
const { 
  getBooks, 
  getAllBooks, 
  addSingleBook, 
  bulkImportBooks, 
  getBookById, 
  toggleWishlist 
} = require('../controllers/book.controller');
const { protect } = require('../middleware/auth.middleware');

// Configure multer for CSV uploads
const upload = multer({ dest: 'uploads/' });

// Publicly accessible if logged in
router.get('/all', protect, getAllBooks);
router.get('/', getBooks); // Used by some frontend components
router.get('/:id', protect, getBookById);

// Private routes
router.post('/', addSingleBook);
router.post('/bulk', upload.single('file'), bulkImportBooks);

// Wishlist actions
router.post('/wishlist/:id', protect, toggleWishlist);

module.exports = router;
