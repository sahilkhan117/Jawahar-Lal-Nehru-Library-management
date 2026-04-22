const Transaction = require('../models/Transaction.model');
const Book = require('../models/Book.model');
const Student = require('../models/Student.model');

exports.getStudentTransactions = async (req, res) => {
  try {
    const studentId = req.user.id;
    const activeTransactions = await Transaction.find({ 
      studentId, 
      status: { $in: ['issued', 'overdue'] } 
    }).populate('bookId');

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
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// POS: Issue Book
exports.issueBook = async (req, res) => {
  try {
    const { studentId: studentPublicId, isbn } = req.body;
    
    const student = await Student.findOne({ id: studentPublicId });
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    
    const book = await Book.findOne({ isbn });
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    
    if (book.availableCopies <= 0) {
      return res.status(400).json({ success: false, message: 'No copies available' });
    }

    // Check if student already has this book
    const existing = await Transaction.findOne({ 
      studentId: student._id, 
      bookId: book._id, 
      status: { $in: ['issued', 'overdue'] } 
    });
    if (existing) return res.status(400).json({ success: false, message: 'Student already has this book issued' });

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // 14 days loan period

    const transaction = await Transaction.create({
      bookId: book._id,
      studentId: student._id,
      dueDate,
      status: 'issued'
    });

    book.availableCopies -= 1;
    await book.save();

    res.status(201).json({ 
      success: true, 
      message: 'Book issued successfully', 
      transaction: await transaction.populate('bookId studentId') 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// POS: Return Book
exports.returnBook = async (req, res) => {
  try {
    const { isbn } = req.body;
    
    const book = await Book.findOne({ isbn });
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });

    const transaction = await Transaction.findOne({ 
      bookId: book._id, 
      status: { $in: ['issued', 'overdue'] } 
    }).sort({ createdAt: -1 }).populate('studentId');

    if (!transaction) return res.status(404).json({ success: false, message: 'No active transaction found for this book' });

    transaction.status = 'returned';
    transaction.returnDate = new Date();
    
    // Calculate fines if overdue
    if (transaction.returnDate > transaction.dueDate) {
      const diffTime = Math.abs(transaction.returnDate - transaction.dueDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      transaction.fineAmount = diffDays * 10; // 10 currency units per day
      transaction.fineStatus = 'unpaid';
      
      const student = await Student.findById(transaction.studentId);
      student.totalActiveFines += transaction.fineAmount;
      await student.save();
    }

    await transaction.save();
    
    book.availableCopies += 1;
    await book.save();

    res.status(200).json({ 
      success: true, 
      message: 'Book returned successfully', 
      transaction 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
