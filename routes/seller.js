const express = require('express');
const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller');
const Product = require('../models/Product');

const router = express.Router();

// ✅ Middleware to verify seller token
const verifySeller = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ success: false, message: "Token missing" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ success: false, message: "Invalid token" });
    req.sellerId = decoded.id;
    next();
  });
};

// 🔐 Seller Login Route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const seller = await Seller.findOne({ username });

    if (!seller || seller.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error during login" });
  }
});

// ➕ Add Product Route
router.post('/product', verifySeller, async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = new Product({
      seller: req.sellerId,
      name,
      price,
      description
    });
    await product.save();
    res.json({ success: true, message: "Product added", product });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error adding product" });
  }
});

// 📋 Get Seller Products
router.get('/products', verifySeller, async (req, res) => {
  try {
    const products = await Product.find({ seller: req.sellerId });
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching products" });
  }
});

// 🧑‍💼 Get Seller Profile
router.get('/profile', verifySeller, async (req, res) => {
  try {
    const seller = await Seller.findById(req.sellerId).select('-password'); // Hide password
    if (!seller) {
      return res.status(404).json({ success: false, message: "Seller not found" });
    }
    res.json({ success: true, seller });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching profile" });
  }
});

module.exports = router;
