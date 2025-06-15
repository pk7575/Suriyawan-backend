const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads folder if it doesn't exist
const baseDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir);
}

// ✅ Dynamic folder setup based on user role
const getUploadPath = (role) => {
  const dir = path.join(baseDir, role);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  return dir;
};

// ✅ Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userRole = req.user?.role || req.body.role || 'general'; // fallback to 'general'
    const uploadPath = getUploadPath(userRole);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// ✅ File filter (optional but safer)
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;
  if (allowed.test(ext) && allowed.test(mime)) {
    cb(null, true);
  } else {
    cb(new Error("❌ Only image files are allowed (jpg, png, gif, webp)"));
  }
};

// ✅ Export upload middleware
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // Max 5MB
  }
});

module.exports = upload;
