const mongoose = require('mongoose');

const librarianSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  // Staff Details
  name: { type: String, required: true },
  contactNumber: { type: String },
  assignedShift: { type: String, enum: ['Morning', 'Afternoon', 'Evening', 'Night'], default: 'Morning' },
  profilePicture: { type: String, default: "" },
  
  // Tracking who added/resolved what (optional but good for auditing)
  booksAddedCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Librarian', librarianSchema);
