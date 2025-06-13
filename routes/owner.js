const express = require("express");
const router = express.Router();
const { loginOwner } = require("../controllers/ownerController");

// ✅ Owner login route
router.post("/login", loginOwner);

// ✅ Ping test route (GET)
router.get("/ping", (req, res) => {
  res.json({ message: "✅ Owner route is live and working" });
});

module.exports = router;
