const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, unique: true },
  category: { type: String },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Library' }, // Reference to which library holds it
  coverImageUrl: { type: String }, // Helpful for the frontend
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
