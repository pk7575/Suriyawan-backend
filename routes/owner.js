const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// 🧑 Dummy Owner Login Info
const DUMMY_OWNER = {
  username: 'pradeepseth646',
  password: '6cmi97KP9MDBzr7' // ✅ Your actual password
};

// 🔐 POST /api/owner/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === DUMMY_OWNER.username && password === DUMMY_OWNER.password) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '2h' });
    return res.json({
      success: true,
      message: '✅ लॉगिन सफल!',
      token
    });
  } else {
    return res.status(401).json({
      success: false,
      message: '❌ अमान्य क्रेडेंशियल्स!'
    });
  }
});

// ✅ GET /api/owner/ping — Backend Health Check
router.get('/ping', (req, res) => {
  res.json({
    success: true,
    message: '✅ Owner API Active & Connected!'
  });
});

// ✅ JWT Auth Middleware
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

// ✅ GET /api/owner/stats — Dashboard Data (Secure Route)
router.get('/stats', authMiddleware, (req, res) => {
  try {
    const dashboardData = {
      success: true,
      orders: 120,
      revenue: "₹34,000",
      deliveryBoys: 7,
      sellers: 15
    };
    res.json(dashboardData);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
