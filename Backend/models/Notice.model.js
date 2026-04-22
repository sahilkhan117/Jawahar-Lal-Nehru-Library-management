const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  targetAudience: { type: String, enum: ['All', 'Student', 'Librarian'], default: 'All' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  postedBy: { type: String, default: 'Admin' }, // or ref to Admin
  expiryDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Notice', noticeSchema);
