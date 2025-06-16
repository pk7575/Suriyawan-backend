const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');

// 🧑‍💼 Dummy Owner Credentials (can move to DB later)
const DUMMY_OWNER = {
  username: 'pradeepseth646',
  password: '6cmi97KP9MDBzr7' // ✅ Static Auth Password
};

// ✅ POST /api/owner/login — Owner Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === DUMMY_OWNER.username && password === DUMMY_OWNER.password) {
    const token = jwt.sign(
      { role: 'owner', username },
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '2h' }
    );

    return res.json({
      success: true,
      message: '✅ लॉगिन सफल!',
      token
    });
  }

  return res.status(401).json({
    success: false,
    message: '❌ अमान्य क्रेडेंशियल्स!'
  });
});

// ✅ GET /api/owner/ping — Health Check
router.get('/ping', (req, res) => {
  res.json({
    success: true,
    message: '✅ Owner API Active & Connected!'
  });
});

// ✅ GET /api/owner/stats — Dashboard Analytics
router.get('/stats', verifyToken, (req, res) => {
  try {
    // You can replace this with real DB stats later
    const dashboardData = {
      success: true,
      orders: 120,
      revenue: "₹34,000",
      deliveryBoys: 7,
      sellers: 15
    };
    res.json(dashboardData);
  } catch (err) {
    res.status(500).json({ success: false, message: "⚠️ Server error" });
  }
});

module.exports = router;
