const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, // Updated Reference
  
  issueDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnDate: { type: Date },
  
  status: { type: String, enum: ['issued', 'returned', 'overdue'], default: 'issued' },
  
  fineAmount: { type: Number, default: 0 },
  fineStatus: { type: String, enum: ['none', 'unpaid', 'paid'], default: 'none' },
  upiTransactionId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
