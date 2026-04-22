const express = require('express');
const router = express.Router();
const { 
  createLibrarian, updateLibrarian, deleteLibrarian, resetLibrarianPassword, getAllLibrarians 
} = require('../controllers/admin.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.use(protect, authorize('admin'));

router.post('/librarians', createLibrarian);
router.get('/librarians', getAllLibrarians);
router.put('/librarians/:id', updateLibrarian);
router.delete('/librarians/:id', deleteLibrarian);
router.patch('/librarians/:id/reset-password', resetLibrarianPassword);

module.exports = router;
