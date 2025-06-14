const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// 🧑 Dummy Owner Login (changeable later)
const DUMMY_OWNER = {
  username: 'pradeepseth646',
  password: '6cmi97KP9MDBzr7' // ✅ Your given password
};

// 🔐 POST /api/owner/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === DUMMY_OWNER.username && password === DUMMY_OWNER.password) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ success: true, token });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// ✅ GET /api/owner/ping — Backend status check
router.get('/ping', (req, res) => {
  res.json({ success: true, message: '✅ Owner API Active & Connected!' });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// 🔒 Ping Route (Keep this)
router.get('/ping', (req, res) => {
  res.json({
    success: true,
    message: '✅ Owner API Active & Connected!',
  });
});

// 🔐 Login Route (Keep this)
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'pradeepseth646' && password === '12345') {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '2h' });
    return res.json({ success: true, message: 'Login successful', token });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// ✅ New Middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// ✅ New Route: Owner Stats (Dashboard Data)
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const data = {
      orders: 120,
      revenue: "₹34,000",
      deliveryBoys: 7,
      sellers: 15
    };
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
