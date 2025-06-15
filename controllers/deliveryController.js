const DeliveryBoy = require("../models/DeliveryBoy");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, phone, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await DeliveryBoy.create({ name, phone, password: hashed });
    res.json({ success: true, message: "Registered", user });
  } catch (err) {
    res.status(400).json({ success: false, message: "Registration failed", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const user = await DeliveryBoy.findOne({ phone });
    if (!user) return res.status(401).json({ success: false, message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ success: false, message: "Incorrect password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.assignments = async (req, res) => {
  const user = await DeliveryBoy.findById(req.user.id);
  res.json({ success: true, assignedParcels: user.assignedParcels });
};

exports.updateStatus = async (req, res) => {
  const { status, parcelId } = req.body;
  const user = await DeliveryBoy.findById(req.user.id);
  // You can add parcel logic here
  res.json({ success: true, message: `Parcel ${parcelId} marked as ${status}` });
};

exports.updateCash = async (req, res) => {
  const { amount } = req.body;
  const user = await DeliveryBoy.findById(req.user.id);
  user.cashCollected += amount;
  await user.save();
  res.json({ success: true, totalCash: user.cashCollected });
};

exports.updateLocation = async (req, res) => {
  const { lat, lng } = req.body;
  const user = await DeliveryBoy.findById(req.user.id);
  user.location = { lat, lng };
  await user.save();
  res.json({ success: true, location: user.location });
};
