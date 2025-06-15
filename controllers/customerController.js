const Customer = require("../models/Customer");
const Product = require("../models/Product");
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

// 🧠 Token Utility
function createToken(customer) {
  return jwt.sign({ id: customer._id }, SECRET, { expiresIn: "3d" });
}

function verifyToken(req) {
  const token = req.cookies.token;
  if (!token) return null;

  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

// ✅ Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Customer.findOne({ email, password });
  if (!user) return res.json({ success: false, message: "Invalid credentials" });

  const token = createToken(user);
  res.cookie("token", token, { httpOnly: true }).json({ success: true });
};

// ✅ Info
exports.info = async (req, res) => {
  const auth = verifyToken(req);
  if (!auth) return res.status(401).json({ error: "Unauthorized" });

  const user = await Customer.findById(auth.id);
  res.json({ name: user.name });
};

// ✅ Logout
exports.logout = async (req, res) => {
  res.clearCookie("token").json({ success: true });
};

// ✅ Products
exports.products = async (req, res) => {
  const products = await Product.find();
  res.json({ products });
};

// ✅ Order
exports.order = async (req, res) => {
  const auth = verifyToken(req);
  if (!auth) return res.status(401).json({ error: "Login required" });

  const { productId } = req.body;
  const order = await Order.create({ customerId: auth.id, productId });
  res.json({ orderId: order._id });
};

// ✅ Track Order
exports.track = async (req, res) => {
  const auth = verifyToken(req);
  if (!auth) return res.status(401).json({ error: "Unauthorized" });

  const order = await Order.findById(req.params.orderId);
  if (!order || order.customerId.toString() !== auth.id) {
    return res.status(403).json({ error: "Access denied" });
  }

  res.json({ status: order.status });
};

// ✅ Help Desk (AI Placeholder)
exports.helpdesk = async (req, res) => {
  const { question } = req.body;
  res.json({ reply: "🧠 AI says: Thanks for your question. We'll reply soon!" });
};
