const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

const {
  addProduct,
  getSellerProducts,
  updateProduct,
  deleteProduct,
  toggleAvailability,
  getAllProductsForCustomer,
  assignProductToDelivery,
  getDeliveryProducts
} = require('../controllers/productController');


// 🔐 Seller Routes
router.post('/seller', verifyToken, addProduct);                       // Add Product (Seller)
router.get('/seller', verifyToken, getSellerProducts);                // Seller's Products
router.put('/seller/:id', verifyToken, updateProduct);                // Update Product
router.delete('/seller/:id', verifyToken, deleteProduct);            // Delete Product
router.patch('/seller/:id/toggle', verifyToken, toggleAvailability); // Toggle Product Availability

// 👨‍💼 Delivery Boy Routes
router.post('/delivery/assign/:productId', verifyToken, assignProductToDelivery); // Assign delivery
router.get('/delivery', verifyToken, getDeliveryProducts);                        // Get assigned products

// 🛒 Customer Routes
router.get('/customer', getAllProductsForCustomer);  // Public Product List for Customers

module.exports = router;
