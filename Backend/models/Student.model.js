const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  enrollmentNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store hashed passwords!
  
  // Profile Details
  name: { type: String, required: true },
  department: { type: String }, // e.g., "Computer Science & Applications"
  semester: { type: Number },
  email: { type: String },
  fatherName: { type: String, required: true },
  mobileNo: { type: Number },
  address: { type: String },
  
  // Library Specifics
  totalActiveFines: { type: Number, default: 0 },
  
  // For the GitHub-style Heatmap
  attendanceHistory: [{ type: Date }] 
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
