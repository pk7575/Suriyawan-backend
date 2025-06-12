const express = require('express');
const router = express.Router();
const { ping } = require('../controllers/ownerController');

router.get('/ping', ping);

module.exports = router;
