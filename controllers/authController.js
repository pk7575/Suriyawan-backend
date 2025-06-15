const Seller = require("../models/Seller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ⬇️ Login Handler
exports.loginSeller = async (req, res) => {
  try {
    const { username, password } = req.body;

    // ❌ Check if fields are missing
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "All fields required." });
    }

    // 🔍 Find seller by username
    const seller = await Seller.findOne({ username });
    if (!seller) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    // 🔑 Compare password
    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Wrong password." });
    }

    // 🔐 Generate JWT token
    const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    // ✅ Success
    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      seller: {
        id: seller._id,
        username: seller.username,
        category: seller.category,
        pincode: seller.pincode
      }
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ success: false, message: "Server error. Try again later." });
  }
};
