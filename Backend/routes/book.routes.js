const express = require('express');
const router = express.Router();
const { getAllBooks, getBookById } = require('../controllers/book.controller');
const { protect } = require('../middleware/auth.middleware');

// Publicly accessible if logged in
router.get('/', protect, getAllBooks);
router.get('/:id', protect, getBookById);

// Wishlist actions
router.post('/wishlist/:id', protect, require('../controllers/book.controller').toggleWishlist);

module.exports = router;
