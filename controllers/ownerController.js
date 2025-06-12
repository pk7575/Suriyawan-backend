const Owner = require('../models/Owner');

const loginOwner = async (req, res) => {
  const { email, password } = req.body;
  try {
    const owner = await Owner.findOne({ email });
    if (!owner || owner.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful', owner });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { loginOwner };
