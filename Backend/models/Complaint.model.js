const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, // Updated Reference
  issueDescription: { type: String, required: true },
  attachment: { type: String, default: "" },
  status: { type: String, enum: ['Pending', 'Resolved'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
