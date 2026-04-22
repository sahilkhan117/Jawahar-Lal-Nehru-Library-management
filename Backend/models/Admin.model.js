const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  adminId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  name: { type: String, required: true },
  accessLevel: { type: String, default: 'SuperAdmin' } // Future-proofing if you add sub-admins
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
