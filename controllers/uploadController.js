const path = require("path");

exports.uploadUserImage = (req, res) => {
  const role = req.params.role;      // seller / customer / delivery
  const id = req.params.id;

  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  const imageUrl = `/uploads/${req.file.filename}`;

  res.json({
    success: true,
    message: `${role} image uploaded successfully`,
    userId: id,
    role: role,
    imageUrl: imageUrl
  });
};
