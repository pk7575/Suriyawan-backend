const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// 🧑 Dummy Owner Login (changeable later)
const DUMMY_OWNER = {
  username: 'pradeepseth646',
  password: '6cmi97KP9MDBzr7' // ✅ Your given password
};

// 🔐 POST /api/owner/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === DUMMY_OWNER.username && password === DUMMY_OWNER.password) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ success: true, token });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// ✅ GET /api/owner/ping — Backend status check
router.get('/ping', (req, res) => {
  res.json({ success: true, message: '✅ Owner API Active & Connected!' });
});

module.exports = router;
