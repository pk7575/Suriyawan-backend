const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// 🧑 Dummy Seller Credentials
const DUMMY_SELLER = {
  username: 'seller001',
  password: 'pass1234'
};

// 🟢 Login Route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === DUMMY_SELLER.username && password === DUMMY_SELLER.password) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ success: true, token, message: '✅ Seller Login Successful!' });
  } else {
    res.status(401).json({ success: false, message: '❌ Invalid credentials' });
  }
});

// 🟢 Auth Middleware
const sellerAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// 🟢 Product Upload (Dummy)
let products = [];

router.post('/products', sellerAuth, (req, res) => {
  const { title, price, description, image } = req.body;
  const newProduct = { title, price, description, image, seller: req.user.username };
  products.push(newProduct);
  res.json({ success: true, message: '✅ Product uploaded', product: newProduct });
});

// 🟢 Dashboard Stats
router.get('/dashboard', sellerAuth, (req, res) => {
  const sellerProducts = products.filter(p => p.seller === req.user.username);
  res.json({
    success: true,
    totalProducts: sellerProducts.length,
    totalValue: '₹' + sellerProducts.reduce((sum, p) => sum + parseFloat(p.price || 0), 0),
    products: sellerProducts
  });
});

module.exports = router;
