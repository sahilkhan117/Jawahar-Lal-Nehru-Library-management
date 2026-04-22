const Librarian = require('../models/Librarian.model');
const Complaint = require('../models/Complaint.model');
const bcrypt = require('bcrypt');

// Create Librarian
exports.createLibrarian = async (req, res) => {
  try {
    const { employeeId, name, password, assignedShift } = req.body;
    
    const existing = await Librarian.findOne({ employeeId });
    if (existing) return res.status(400).json({ message: 'Librarian with this ID already exists' });

    const hashedPassword = await bcrypt.hash(password || 'lib123', 10);
    
    const librarian = await Librarian.create({
      employeeId,
      name,
      password: hashedPassword,
      assignedShift
    });

    res.status(201).json({ success: true, librarian });
  } catch (error) {
    res.status(500).json({ message: 'Error creating librarian' });
  }
};

// Update Librarian
exports.updateLibrarian = async (req, res) => {
  try {
    const { name, assignedShift } = req.body;
    const librarian = await Librarian.findByIdAndUpdate(
      req.params.id,
      { name, assignedShift },
      { new: true }
    );
    res.status(200).json({ success: true, librarian });
  } catch (error) {
    res.status(500).json({ message: 'Error updating librarian' });
  }
};

// Reset Librarian Password
exports.resetLibrarianPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Librarian.findByIdAndUpdate(req.params.id, { password: hashedPassword });
    res.status(200).json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password' });
  }
};

// Delete Librarian
exports.deleteLibrarian = async (req, res) => {
  try {
    await Librarian.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Librarian deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting librarian' });
  }
};

// Get all Librarians
exports.getAllLibrarians = async (req, res) => {
  try {
    const librarians = await Librarian.find().select('-password');
    res.status(200).json({ success: true, librarians });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all Complaints for Admin
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate('studentId', 'name enrollmentNumber department')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, complaints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching complaints' });
  }
};

// Update Complaint Status
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('studentId', 'name enrollmentNumber department');
    
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.status(200).json({ success: true, complaint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating complaint' });
  }
};
