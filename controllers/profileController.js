const Seller = require("../models/Seller");
const bcrypt = require("bcryptjs");

// 👤 Get Seller Profile
exports.getProfile = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const seller = await Seller.findById(sellerId).select("-password"); // Password ko chhupa rahe hain

    if (!seller) {
      return res.status(404).json({ success: false, message: "Seller not found." });
    }

    res.status(200).json({ success: true, seller });
  } catch (err) {
    console.error("Get Profile Error:", err.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// 🛠️ Update Seller Profile
exports.updateProfile = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const { category, pincode, password } = req.body;

    const updateData = {};

    if (category) updateData.category = category;
    if (pincode) updateData.pincode = pincode;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedSeller = await Seller.findByIdAndUpdate(sellerId, updateData, {
      new: true,
      runValidators: true
    }).select("-password");

    res.status(200).json({ success: true, seller: updatedSeller });
  } catch (err) {
    console.error("Update Profile Error:", err.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
