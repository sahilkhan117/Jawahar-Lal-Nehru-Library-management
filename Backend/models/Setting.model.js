const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  ugBookLimit: { type: Number, default: 2 },
  pgBookLimit: { type: Number, default: 4 },
  maxFineLimit: { type: Number, default: 500 }
}, { timestamps: true });

module.exports = mongoose.model('Setting', settingSchema);
