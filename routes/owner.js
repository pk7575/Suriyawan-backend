const express = require("express");
const router = express.Router();
const { loginOwner, getOwnerStats } = require("../controllers/ownerController");

// Owner login route
router.post("/login", loginOwner);

// Dashboard stats route
router.get("/stats", getOwnerStats);

module.exports = router;
