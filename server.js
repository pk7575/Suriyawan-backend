const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const ownerRoutes = require('./routes/ownerRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/owner', ownerRoutes);

// Root test
app.get('/', (req, res) => {
  res.send('✅ Suriyawan Backend is Running');
});

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB Connected');
}).catch(err => {
  console.error('❌ Mongo Error:', err.message);
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
