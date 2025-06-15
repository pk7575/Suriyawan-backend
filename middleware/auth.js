const express = require('express');
const router = express.Router();
const {
  sellerRegister,
  sellerLogin,
  customerRegister,
  customerLogin,
  deliveryBoyRegister,
  deliveryBoyLogin
} = require('../controllers/authController');

// -------------------------
// 📦 Seller Auth Routes
// -------------------------
router.post('/seller/register', sellerRegister);
router.post('/seller/login', sellerLogin);

// -------------------------
// 🛍️ Customer Auth Routes
// -------------------------
router.post('/customer/register', customerRegister);
router.post('/customer/login', customerLogin);

// -------------------------
// 🚚 Delivery Boy Auth Routes
// -------------------------
router.post('/delivery/register', deliveryBoyRegister);
router.post('/delivery/login', deliveryBoyLogin);

module.exports = router;
