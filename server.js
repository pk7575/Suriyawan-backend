const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ownerRoutes = require('./routes/ownerRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// API route
app.use('/api/owner', ownerRoutes);

// Root test
app.get('/', (req, res) => {
  res.send('Backend working!');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.error('MongoDB connection error:', err));
