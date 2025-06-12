const express = require('express');
const router = express.Router();
const { ping } = require('../controllers/ownerController');

router.get('/ping', ping);

module.exports = router;
// routes/ownerRoutes.js
const express = require('express');
const router = express.Router();
const { loginOwner } = require('../controllers/ownerController');

// Ping route
router.get('/ping', (req, res) => {
  res.json({ message: '✅ Owner route is live' });
});

// Login route
router.post('/login', loginOwner);

module.exports = router;
