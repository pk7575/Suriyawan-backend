const express = require('express');
const router = express.Router();
const { loginOwner } = require('../controllers/ownerController');

router.post('/login', loginOwner);

module.exports = router;
