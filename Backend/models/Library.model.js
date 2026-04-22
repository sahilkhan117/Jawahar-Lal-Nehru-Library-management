const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  location: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Library', librarySchema);
