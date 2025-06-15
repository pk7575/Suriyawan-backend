const Seller = require('../models/Seller');
const Product = require('../models/Product');

// ✅ Get seller profile
exports.getSellerProfile = async (req, res) => {
  try {
    const seller = await Seller.findById(req.user.id).select('-password');
    if (!seller) return res.status(404).json({ message: 'Seller not found' });

    res.json(seller);
  } catch (err) {
    console.error('Error fetching seller profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Update seller profile
exports.updateSellerProfile = async (req, res) => {
  try {
    const updates = req.body;
    const seller = await Seller.findByIdAndUpdate(req.user.id, updates, { new: true });

    if (!seller) return res.status(404).json({ message: 'Seller not found' });

    res.json({ message: 'Seller profile updated', seller });
  } catch (err) {
    console.error('Error updating seller profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Delete seller account
exports.deleteSeller = async (req, res) => {
  try {
    await Seller.findByIdAndDelete(req.user.id);
    res.json({ message: 'Seller account deleted' });
  } catch (err) {
    console.error('Error deleting seller:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get seller's products
exports.getSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id });
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
