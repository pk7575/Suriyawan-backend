const jwt = require("jsonwebtoken");
const DeliveryBoy = require("../models/DeliveryBoy");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ success: false, message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await DeliveryBoy.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};
