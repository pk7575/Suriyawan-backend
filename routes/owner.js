const express = require('express');
const router = express.Router();
const { loginOwner } = require('../controllers/ownerController');

// POST: /api/owner/login
router.post('/login', loginOwner);

// GET: /api/owner/ping — to test connection
router.get('/ping', (req, res) => {
  res.json({ message: '✅ Owner route is working!' });
});

module.exports = router;
