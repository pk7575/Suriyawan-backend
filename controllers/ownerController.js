const jwt = require("jsonwebtoken");

// 🔐 Dummy Business Stats
const stats = {
  totalOrders: 1245,
  revenue: 357000,
  deliveryBoys: 15,
  sellers: 42,
};

// 🔐 Owner Login
const loginOwner = (req, res) => {
  const { username, password } = req.body;

  if (username === "pradeepseth646" && password === "bdRjmufQpjXigKGB") {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    return res.json({ success: true, token });
  }

  return res.status(401).json({ success: false, message: "Invalid credentials" });
};

// 📊 Owner Dashboard Stats
const getOwnerStats = (req, res) => {
  return res.json({
    success: true,
    data: stats,
  });
};

module.exports = { loginOwner, getOwnerStats };
