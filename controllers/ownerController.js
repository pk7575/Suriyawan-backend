const jwt = require("jsonwebtoken");

const loginOwner = (req, res) => {
  const { username, password } = req.body;

  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "admin123";

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid credentials",
  });
};

module.exports = { loginOwner };
