const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  isbn: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  publisher: { type: String },
  edition: { type: String },
  
  // Inventory details
  totalCopies: { type: Number, required: true, default: 1 },
  availableCopies: { type: Number, required: true, default: 1 },
  
  // Physical location
  shelfLocation: { type: String }, // e.g., "A-12"
  
  // Metadata
  coverImage: { type: String },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
