const Transaction = require('../models/Transaction.model');

exports.getStudentTransactions = async (req, res) => {
  try {
    const studentId = req.user.id;
    
    // Get currently issued books
    const activeTransactions = await Transaction.find({ 
      studentId, 
      status: { $in: ['issued', 'overdue'] } 
    }).populate('bookId');

    // Get past transactions
    const pastTransactions = await Transaction.find({ 
      studentId, 
      status: 'returned' 
    }).populate('bookId').sort({ returnDate: -1 });

    res.status(200).json({
      success: true,
      active: activeTransactions,
      history: pastTransactions
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
