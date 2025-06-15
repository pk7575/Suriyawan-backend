const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { uploadUserImage } = require("../controllers/uploadController");

// ⬆️ Role can be 'seller', 'customer', 'delivery'
router.post("/upload/:role/:id", upload.single("image"), uploadUserImage);

module.exports = router;
