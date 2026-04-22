const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const { protect } = require('../middleware/auth.middleware');
const Student = require('../models/Student.model');
const Librarian = require('../models/Librarian.model');
const Admin = require('../models/Admin.model');

// Update User DP (Handles Student, Librarian, Admin)
router.post('/profile-picture', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const userId = req.user.id;
    const role = req.user.role;
    let updatedUser;

    if (role === 'student') {
      updatedUser = await Student.findByIdAndUpdate(userId, { profilePicture: req.file.path }, { new: true });
    } else if (role === 'librarian') {
      updatedUser = await Librarian.findByIdAndUpdate(userId, { profilePicture: req.file.path }, { new: true });
    } else if (role === 'admin') {
      updatedUser = await Admin.findByIdAndUpdate(userId, { profilePicture: req.file.path }, { new: true });
    }

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      imageUrl: req.file.path,
      user: updatedUser
    });
  } catch (error) {
    console.error('--- UPLOAD ERROR ---', error);
    res.status(500).json({ message: 'Upload failed' });
  }
});

module.exports = router;
