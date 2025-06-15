// ✅ Load required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// ✅ Load routes
const ownerRoutes = require('./routes/owner');
const sellerRoutes = require('./routes/seller'); // Seller route

// ✅ Configure environment
dotenv.config();

// ✅ Initialize express app
const app = express();

// ✅ Middleware setup
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use('/api/owner', ownerRoutes);
app.use('/api/seller', sellerRoutes);

// ✅ Root health route
app.get('/', (req, res) => {
  res.send('🚀 Suriyawan Backend Working');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
