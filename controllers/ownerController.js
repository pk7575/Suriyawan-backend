const jwt = require('jsonwebtoken');

// Dummy owner credentials
const OWNER_USERNAME = 'pradeepseth646';
const OWNER_PASSWORD = 'your_actual_password'; // Replace with real one or use env variable

// Login handler
exports.loginOwner = (req, res) => {
  const { username, password } = req.body;

  if (username === OWNER_USERNAME && password === OWNER_PASSWORD) {
    const token = jwt.sign({ role: 'owner' }, process.env.JWT_SECRET || 'secretkey', {
      expiresIn: '1d'
    });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
};

// Stats handler
exports.getOwnerStats = (req, res) => {
  res.json({
    orders: 123,
    revenue: '₹12,000',
    deliveryBoys: 5,
    sellers: 8
  });
};
