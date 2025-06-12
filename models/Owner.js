const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  pin: { type: String, default: "0000" }
});

module.exports = mongoose.model('Owner', ownerSchema);
