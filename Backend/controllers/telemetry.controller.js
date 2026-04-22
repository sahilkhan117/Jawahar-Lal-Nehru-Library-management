const Book = require('../models/Book.model');
const Student = require('../models/Student.model');
const Transaction = require('../models/Transaction.model');
const Notice = require('../models/Notice.model');

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

exports.getStudentStats = async (req, res) => {
  try {
    const studentId = req.user.id;
    
    const issuedBooks = await Transaction.countDocuments({ studentId, status: 'issued' });
    const overdueBooks = await Transaction.countDocuments({ studentId, status: 'overdue' });
    
    const student = await Student.findById(studentId);

    res.status(200).json({
      success: true,
      stats: {
        issuedBooks,
        overdueBooks,
        totalFines: student.totalActiveFines
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
