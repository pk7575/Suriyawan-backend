const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, default: "No description provided" },
  category: { type: String, default: "General" },           // Optional (for future filtering)
  stock: { type: Number, default: 100 },                    // For inventory (D24 future)
  image: { type: String, default: "" },                     // Product image URL (optional)
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
