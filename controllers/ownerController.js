const jwt = require("jsonwebtoken");

// ✅ Login Handler
const loginOwner = (req, res) => {
  const { username, password } = req.body;

  if (username === "pradeepseth646" && password === "6cmi97KP9MDBzr7") {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.json({ success: true, token });
  }

  return res.status(401).json({ success: false, message: "Invalid credentials" });
};

// ✅ Dashboard Stats Handler (Fake data)
const getDashboardStats = (req, res) => {
  try {
    // ✅ Future: Replace with real DB data
    const stats = {
      orders: 1023,
      revenue: "₹1,80,500",
      deliveryBoys: 14,
      sellers: 28,
    };

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ Health check for frontend connection test
const ping = (req, res) => {
  res.json({ message: "✅ Suriyawan Backend is working!" });
};

module.exports = { loginOwner, getDashboardStats, ping };
const getOwnerStats = async (req, res) => {
  try {
    // Dummy static data for testing
    const stats = {
      orders: 124,
      revenue: 57240,
      deliveryBoys: 5,
      sellers: 12
    };

    res.json(stats);
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getOwnerStats
};
