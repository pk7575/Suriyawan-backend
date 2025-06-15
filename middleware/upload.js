const multer = require("multer");
const path = require("path");

// File storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Upload path
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "_" + file.originalname.replace(/\s/g, "_");
    cb(null, uniqueName);
  }
});

// File filter (optional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("❌ Invalid file type"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
