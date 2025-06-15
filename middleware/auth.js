const jwt = require('jsonwebtoken');
const Seller = require('../models/seller');
const Customer = require('../models/customer');
const DeliveryBoy = require('../models/deliveryBoy');

const JWT_SECRET = process.env.JWT_SECRET || 'yourSecretKey'; // Use .env for production

// 🔐 Middleware for Seller
const verifySeller = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ success: false, message: "Access denied: No token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const seller = await Seller.findById(decoded.id);
    if (!seller) return res.status(401).json({ success: false, message: "Seller not found" });

    req.seller = seller;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// 🔐 Middleware for Customer
const verifyCustomer = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ success: false, message: "Access denied: No token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const customer = await Customer.findById(decoded.id);
    if (!customer) return res.status(401).json({ success: false, message: "Customer not found" });

    req.customer = customer;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// 🔐 Middleware for Delivery Boy
const verifyDeliveryBoy = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ success: false, message: "Access denied: No token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const deliveryBoy = await DeliveryBoy.findById(decoded.id);
    if (!deliveryBoy) return res.status(401).json({ success: false, message: "Delivery Boy not found" });

    req.deliveryBoy = deliveryBoy;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports = {
  verifySeller,
  verifyCustomer,
  verifyDeliveryBoy
};
