const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

const {
  sellerProfile,
  updateSeller
} = require('../controllers/sellerController');

const {
  deliveryProfile,
  updateDelivery
} = require('../controllers/deliveryController');

const {
  customerProfile,
  updateCustomer
} = require('../controllers/customerController');

// 📌 Seller Profile Routes
router.get('/seller', verifyToken, sellerProfile);
router.put('/seller', verifyToken, updateSeller);

// 📌 Delivery Boy Profile Routes
router.get('/delivery', verifyToken, deliveryProfile);
router.put('/delivery', verifyToken, updateDelivery);

// 📌 Customer Profile Routes
router.get('/customer', verifyToken, customerProfile);
router.put('/customer', verifyToken, updateCustomer);

module.exports = router;
