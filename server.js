const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.get("/", (req, res) => {
  res.send("Suriyawan Backend is running.");
});

const ownerRoutes = require("./routes/owner");
app.use("/api/owner", ownerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const ownerRoutes = require("./routes/owner"); // ✅ Route import

app.use(cors());
app.use(express.json());

// Route use
app.use("/api/owner", ownerRoutes); // ✅ Login API

// Root Test
app.get("/", (req, res) => {
  res.send("Suriyawan Backend is running ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
