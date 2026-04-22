const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, unique: true },
  category: { type: String },
  totalCopies: { type: Number, default: 1 },
  availableCopies: { type: Number, default: 1 },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Library' }, // Reference to which library holds it
  coverImageUrl: { type: String } // Helpful for the frontend
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
