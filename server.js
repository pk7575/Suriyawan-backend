const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const ownerRoutes = require('./routes/ownerRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/owner', ownerRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Suriyawan Saffari Backend is running');
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('✅ MongoDB Connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
