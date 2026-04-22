const Student = require('../models/Student.model');
const bcrypt = require('bcrypt');

// Create Student
exports.createStudent = async (req, res) => {
  try {
    const { enrollmentNumber, name, password, department, semester, fatherName, mobileNo } = req.body;
    
    const existing = await Student.findOne({ enrollmentNumber });
    if (existing) return res.status(400).json({ message: 'Student already exists' });

    const hashedPassword = await bcrypt.hash(password || 'std123', 10);
    
    const student = await Student.create({
      enrollmentNumber,
      name,
      password: hashedPassword,
      department,
      semester,
      fatherName,
      mobileNo
    });

    res.status(201).json({ success: true, student });
  } catch (error) {
    res.status(500).json({ message: 'Error creating student' });
  }
};

// Update Student
exports.updateStudent = async (req, res) => {
  try {
    const { name, department, semester, fatherName, mobileNo } = req.body;
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, department, semester, fatherName, mobileNo },
      { new: true }
    );
    res.status(200).json({ success: true, student });
  } catch (error) {
    res.status(500).json({ message: 'Error updating student' });
  }
};

// Reset Student Password
exports.resetStudentPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Student.findByIdAndUpdate(req.params.id, { password: hashedPassword });
    res.status(200).json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password' });
  }
};

// Delete Student
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student' });
  }
};

// Get all Students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select('-password');
    res.status(200).json({ success: true, students });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
