const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    category: {
      type: String,
      default: ""
    },
    pincode: {
      type: String,
      default: ""
    },
    phase: {
      type: String,
      default: "Not Set"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seller", sellerSchema);
