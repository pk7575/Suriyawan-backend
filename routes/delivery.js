const express = require("express");
const router = express.Router();
const delivery = require("../controllers/deliveryController");
const auth = require("../middleware/auth");

// Public
router.post("/register", delivery.register);
router.post("/login", delivery.login);

// Protected
router.get("/assignments", auth, delivery.assignments);
router.post("/update-status", auth, delivery.updateStatus);
router.post("/cash", auth, delivery.updateCash);
router.post("/location", auth, delivery.updateLocation);

module.exports = router;
