const Owner = require('../models/ownerModel');

const loginOwner = async (req, res) => {
  const { email, password } = req.body;

  try {
    const owner = await Owner.findOne({ email });

    if (!owner || owner.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      message: '✅ Login successful',
      owner: {
        id: owner._id,
        email: owner.email,
        pin: owner.pin
      }
    });
  } catch (error) {
    res.status(500).json({ message: '❌ Server error', error });
  }
};

module.exports = { loginOwner };
