const Product = require("../models/Product");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// 📤 Add New Product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const sellerId = req.user.id;

    if (!req.file) return res.status(400).json({ success: false, message: "Image required" });

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "seller_products"
    });

    // Delete local temp file
    fs.unlinkSync(req.file.path);

    const newProduct = new Product({
      seller: sellerId,
      name,
      price,
      description,
      imageUrl: result.secure_url
    });

    await newProduct.save();

    res.status(201).json({ success: true, product: newProduct });
  } catch (err) {
    console.error("Create Product Error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 📄 Get All Products for Seller
exports.getSellerProducts = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const products = await Product.find({ seller: sellerId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, products });
  } catch (err) {
    console.error("Get Products Error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✏️ Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const productId = req.params.id;
    const sellerId = req.user.id;

    const product = await Product.findOneAndUpdate(
      { _id: productId, seller: sellerId },
      { name, price, description },
      { new: true, runValidators: true }
    );

    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, product });
  } catch (err) {
    console.error("Update Product Error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🗑️ Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const sellerId = req.user.id;

    const product = await Product.findOneAndDelete({ _id: productId, seller: sellerId });

    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (err) {
    console.error("Delete Product Error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🚦 Toggle Product Availability
exports.toggleAvailability = async (req, res) => {
  try {
    const productId = req.params.id;
    const sellerId = req.user.id;

    const product = await Product.findOne({ _id: productId, seller: sellerId });

    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    product.available = !product.available;
    await product.save();

    res.status(200).json({
      success: true,
      message: `Product is now ${product.available ? "Available" : "Unavailable"}`
    });
  } catch (err) {
    console.error("Toggle Availability Error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
