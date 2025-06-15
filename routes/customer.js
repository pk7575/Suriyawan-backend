// ✅ Import core modules
const express = require("express");
const router = express.Router();

// ✅ Import controller functions
const {
  loginCustomer,       // D1: Login
  logoutCustomer,      // D12: Logout
  getCustomerInfo,     // D3: Customer Info
  getProducts,         // D2: Load Products
  placeOrder,          // D5: Place Order
  trackOrder,          // D7: Track Order
  askHelpdesk          // D8–D11: Helpdesk AI Chat
} = require("../controllers/customerController");

// ✅ D1: Customer Login
// Route: POST /api/customer/login
router.post("/login", loginCustomer);

// ✅ D12: Customer Logout
// Route: POST /api/customer/logout
router.post("/logout", logoutCustomer);

// ✅ D3: Get Customer Info
// Route: GET /api/customer/info
router.get("/info", getCustomerInfo);

// ✅ D2: Fetch All Products
// Route: GET /api/customer/products
router.get("/products", getProducts);

// ✅ D5: Place a New Order
// Route: POST /api/customer/order
router.post("/order", placeOrder);

// ✅ D7: Track Order by Order ID
// Route: GET /api/customer/track/:orderId
router.get("/track/:orderId", trackOrder);

// ✅ D8–D11: Ask AI Helpdesk a Question
// Route: POST /api/customer/helpdesk/ask
router.post("/helpdesk/ask", askHelpdesk);

// 🛠️ D13–D25: Future Routes (e.g., Wallet, Wishlist, Feedback, Complaints) to be added here

// ✅ Export Router
module.exports = router;
