const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Student = require('../models/Student.model');
const Librarian = require('../models/Librarian.model');
const Admin = require('../models/Admin.model');

exports.login = async (req, res) => {
  try {
    const { id, password } = req.body;

    if (!id || !password) {
      return res.status(400).json({ message: 'Please provide ID and password' });
    }

    let user = null;
    let role = null;

    // 1. Check Student
    user = await Student.findOne({ enrollmentNumber: id });
    if (user) role = 'student';

    // 2. Check Librarian (if not found in Student)
    if (!user) {
      user = await Librarian.findOne({ employeeId: id });
      if (user) role = 'librarian';
    }

    // 3. Check Admin (if not found in Librarian)
    if (!user) {
      user = await Admin.findOne({ adminId: id });
      if (user) role = 'admin';
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create Token
    const token = jwt.sign(
      { id: user._id, role: role },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '30d' }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: id,
        name: user.name,
        role: role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMe = async (req, res) => {
  try {
    let user;
    if (req.user.role === 'student') {
      user = await Student.findById(req.user.id).select('-password');
    } else if (req.user.role === 'librarian') {
      user = await Librarian.findById(req.user.id).select('-password');
    } else {
      user = await Admin.findById(req.user.id).select('-password');
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user: {
        ...user.toObject(),
        role: req.user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
