const express = require('express');
const router = express.Router();
const { loginOwner } = require('../controllers/ownerController');

router.post('/login', loginOwner);

module.exports = router;
const express = require('express');
const router = express.Router();

// ✅ Ping Route
router.get('/ping', (req, res) => {
  res.status(200).json({ message: 'Backend working: Owner Ping Success ✅' });
});

module.exports = router;
