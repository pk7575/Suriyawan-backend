const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: mongoose.Schema.Types.ObjectId,
  productId: mongoose.Schema.Types.ObjectId,
  status: { type: String, default: "Processing" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
