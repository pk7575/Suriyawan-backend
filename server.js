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
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

app.use("/api/delivery", require("./routes/delivery"));

app.get("/", (req, res) => {
  res.send("🚚 Delivery Boy API Running");
});

const PORT = process.env.PORT || 5052;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
