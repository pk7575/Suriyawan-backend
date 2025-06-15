const express = require('express');
const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller');
const Product = require('../models/Product');
const router = express.Router();

// Middleware to verify seller token
const verifySeller = (req, res, next) => {
  const token = req.headers['authorization']?.split(" ")[1];
  if (!token) return res.status(401).json({ success: false, message: "Token required" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ success: false, message: "Invalid token" });
    req.sellerId = decoded.id;
    next();
  });
};

// 👉 Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const seller = await Seller.findOne({ username });

  if (!seller || seller.password !== password) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ success: true, token });
});

// 👉 Add Product
router.post('/product', verifySeller, async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const newProduct = new Product({
      seller: req.sellerId,
      name,
      price,
      description
    });
    await newProduct.save();
    res.json({ success: true, message: "Product added", product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 👉 Get Seller's Products
router.get('/products', verifySeller, async (req, res) => {
  try {
    const products = await Product.find({ seller: req.sellerId });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
