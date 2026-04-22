const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const { protect } = require('../middleware/auth.middleware');
const Complaint = require('../models/Complaint.model');

// Submit Complaint with optional image
router.post('/', protect, upload.single('attachment'), async (req, res) => {
  try {
    const { issueDescription } = req.body;
    
    if (!issueDescription) {
      return res.status(400).json({ message: 'Issue description is required' });
    }

    const complaint = await Complaint.create({
      studentId: req.user.id,
      issueDescription,
      attachment: req.file ? req.file.path : "",
      status: 'Pending'
    });

    res.status(201).json({
      success: true,
      complaint
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to submit complaint' });
  }
});

// Get student's complaints
router.get('/my', protect, async (req, res) => {
  try {
    const complaints = await Complaint.find({ studentId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, complaints });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
