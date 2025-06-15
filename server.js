// ✅ Load required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// ✅ Load environment variables
dotenv.config();

// ✅ Initialize express app
const app = express();

// ✅ Middleware setup
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Load routes
const ownerRoutes = require('./routes/owner');
const sellerRoutes = require('./routes/seller');
const deliveryRoutes = require('./routes/delivery'); // New

// ✅ Route setup
app.use('/api/owner', ownerRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/delivery', deliveryRoutes); // New

// ✅ Health Check
app.get('/', (req, res) => {
  res.send('🚀 Suriyawan Saffari Backend is Working!');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
