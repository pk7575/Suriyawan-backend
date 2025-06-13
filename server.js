const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const ownerRoutes = require('./routes/owner');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Route: /api/owner
app.use('/api/owner', ownerRoutes);

// Optional root check
app.get('/', (req, res) => {
  res.send('🚀 Suriyawan Backend Working');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
