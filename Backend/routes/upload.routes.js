const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const { protect } = require('../middleware/auth.middleware');
const Student = require('../models/Student.model');

// Update Student DP
router.post('/profile-picture', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const student = await Student.findByIdAndUpdate(
      req.user.id,
      { profilePicture: req.file.path },
      { new: true }
    );

    res.status(200).json({
      success: true,
      imageUrl: req.file.path,
      user: student
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Upload failed' });
  }
});

module.exports = router;
