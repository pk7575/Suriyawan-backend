const Owner = require('../models/Owner');

exports.ping = (req, res) => {
  res.status(200).json({ message: '✅ Owner route is live' });
};
// controllers/ownerController.js
const Owner = require('../models/Owner');

exports.loginOwner = async (req, res) => {
  const { email, password } = req.body;
  try {
    const owner = await Owner.findOne({ email });
    if (!owner || owner.password !== password) {
      return res.status(401).json({ message: '❌ Invalid credentials' });
    }
    res.status(200).json({ message: '✅ Login successful', ownerId: owner._id });
  } catch (err) {
    res.status(500).json({ message: '⚠️ Server error', error: err.message });
  }
};
