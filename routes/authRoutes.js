const express = require('express');
const router = express.Router();
const { sellerLogin, sellerRegister, sellerProfile, updateSeller } = require('../controllers/sellerController');
const { deliveryLogin, deliveryRegister, deliveryProfile, updateDelivery } = require('../controllers/deliveryController');
const { customerLogin, customerRegister, customerProfile, updateCustomer } = require('../controllers/customerController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Seller Routes
router.post('/seller/register', sellerRegister);
router.post('/seller/login', sellerLogin);
router.get('/seller/profile', verifyToken, sellerProfile);
router.put('/seller/profile', verifyToken, updateSeller);

// Delivery Boy Routes
router.post('/delivery/register', deliveryRegister);
router.post('/delivery/login', deliveryLogin);
router.get('/delivery/profile', verifyToken, deliveryProfile);
router.put('/delivery/profile', verifyToken, updateDelivery);

// Customer Routes
router.post('/customer/register', customerRegister);
router.post('/customer/login', customerLogin);
router.get('/customer/profile', verifyToken, customerProfile);
router.put('/customer/profile', verifyToken, updateCustomer);

module.exports = router;
