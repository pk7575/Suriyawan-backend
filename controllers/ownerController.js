const jwt = require("jsonwebtoken");

const loginOwner = (req, res) => {
  const { username, password } = req.body;

  // ✅ Update this to your actual credentials
  if (username === "pradeepseth646" && password === "gjdzdhjbn") {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ success: true, token });
  }

  return res.status(401).json({ success: false, message: "Invalid credentials" });
};

module.exports = { loginOwner };
