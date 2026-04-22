const Book = require('../models/Book.model');
const Student = require('../models/Student.model');
const Transaction = require('../models/Transaction.model');
const Notice = require('../models/Notice.model');
const Library = require('../models/Library.model');

exports.getGlobalStats = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const totalStudents = await Student.countDocuments();
    const activeTransactions = await Transaction.countDocuments({ status: 'issued' });
    const overdueTransactions = await Transaction.countDocuments({ status: 'overdue' });
    
    // Recent notices
    const recentNotices = await Notice.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      success: true,
      stats: {
        totalBooks,
        totalStudents,
        activeTransactions,
        overdueTransactions
      },
      notices: recentNotices
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getLibraryStats = async (req, res) => {
  try {
    const libraries = await Library.find();
    
    const totalCapacity = libraries.reduce((acc, lib) => acc + lib.totalSeats, 0);
    const totalAvailable = libraries.reduce((acc, lib) => acc + lib.availableSeats, 0);
    const totalOccupied = totalCapacity - totalAvailable;

    res.status(200).json({
      success: true,
      libraries,
      summary: {
        totalCapacity,
        totalAvailable,
        totalOccupied,
        occupancyPercentage: totalCapacity > 0 ? Math.round((totalOccupied / totalCapacity) * 100) : 0
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStudentStats = async (req, res) => {
  try {
    const studentId = req.user.id;
    
    const issuedBooks = await Transaction.countDocuments({ studentId, status: 'issued' });
    const overdueBooks = await Transaction.countDocuments({ studentId, status: 'overdue' });
    
    const student = await Student.findById(studentId);
    
    // Fetch latest 5 notices for students or all
    const notices = await Notice.find({ 
      targetAudience: { $in: ['All', 'Student'] } 
    }).sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      success: true,
      stats: {
        issuedBooks,
        overdueBooks,
        totalFines: student.totalActiveFines,
        attendanceHistory: student.attendanceHistory || []
      },
      notices
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
