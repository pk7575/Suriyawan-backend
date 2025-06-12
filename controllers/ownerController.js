const Owner = require('../models/Owner');

exports.ping = (req, res) => {
  res.status(200).json({ message: '✅ Owner route is live' });
};
