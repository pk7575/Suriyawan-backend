const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Dummy seller data (database ke jagah abhi temporary data)
const SELLER_USERNAME = "seller2025";
const SELLER_PASSWORD = "123456";
const JWT_SECRET = process.env.JWT_SECRET || "suriyawan_secret";

// ✅ Route: POST /api/seller/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === SELLER_USERNAME && password === SELLER_PASSWORD) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '2h' });
    return res.status(200).json({
      success: true,
      message: "✅ लॉगिन सफल (Seller)",
      token
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "❌ अमान्य लॉगिन विवरण (Seller)"
    });
  }
});

// ✅ Middleware to verify token
const verifySeller = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(403).json({ success: false, message: "🔒 Token missing" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.seller = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: "⛔ Invalid Token" });
  }
};

// ✅ Route: GET /api/seller/dashboard (Protected)
router.get('/dashboard', verifySeller, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "📊 Seller Dashboard Connected",
    stats: {
      productsListed: 24,
      ordersReceived: 51,
      totalRevenue: "₹18,500"
    }
  });
});

module.exports = router;
