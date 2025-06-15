// ✅ Load required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// ✅ Load routes
const ownerRoutes = require('./routes/owner');
const sellerRoutes = require('./routes/seller');

// ✅ Load environment variables
dotenv.config();

// ✅ Initialize express app
const app = express();
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use('/api/owner', ownerRoutes);
app.use('/api/seller', sellerRoutes);

// ✅ Health Check
app.get('/', (req, res) => {
  res.send('🚀 Suriyawan Backend Working');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
