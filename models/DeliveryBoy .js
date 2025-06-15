const mongoose = require("mongoose");

const deliveryBoySchema = new mongoose.Schema({
  name: String,
  phone: { type: String, unique: true },
  password: String,
  assignedParcels: [String], // tracking IDs
  cashCollected: { type: Number, default: 0 },
  location: {
    lat: Number,
    lng: Number,
  },
  status: { type: String, default: "Available" },
});

module.exports = mongoose.model("DeliveryBoy", deliveryBoySchema);
