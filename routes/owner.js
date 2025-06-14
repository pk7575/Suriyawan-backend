const router = require('express').Router();
const { loginOwner, getOwnerStats } = require('../controllers/ownerController');
const verifyToken = require('../middleware/verifyToken');

// Owner login route
router.post('/login', loginOwner);

// Dashboard stats route (protected)
router.get('/stats', verifyToken, getOwnerStats);

module.exports = router;
