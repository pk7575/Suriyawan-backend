const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  info,
  products,
  order,
  track,
  helpdesk
} = require("../controllers/customerController");

router.post("/login", login);
router.post("/logout", logout);
router.get("/info", info);
router.get("/products", products);
router.post("/order", order);
router.get("/track/:orderId", track);
router.post("/helpdesk/ask", helpdesk);

module.exports = router;
