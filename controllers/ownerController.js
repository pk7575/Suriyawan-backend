const Owner = require('../models/Owner');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginOwner = async (req, res) => {
  const { email, password } = req.body;

  try {
    const owner = await Owner.findOne({ email });
    if (!owner) return res.status(404).json({ message: 'Owner not found' });

    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ ownerId: owner._id }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
