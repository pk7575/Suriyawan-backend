const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pin: { type: String, default: '' }
});

module.exports = mongoose.model('Owner', ownerSchema);
