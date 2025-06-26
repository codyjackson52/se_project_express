const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // ✅ Step 1: import cors
const routes = require("./routes");

const { PORT = 3001 } = process.env;

const app = express();

// ✅ Step 2: Use cors before routes
app.use(cors());

// ✅ Step 3: Parse JSON bodies
app.use(express.json());

// ✅ Step 4: TEMPORARY AUTH MIDDLEWARE (before routes)
app.use((req, res, next) => {
  req.user = {
    _id: "6859b4f7085636bc6d8ac8b7", // 🔁 Replace this once user is created
  };
  console.log("🧪 Auth middleware injected user ID:", req.user._id); // Debug
  next();
});

// ✅ Step 5: Log every incoming request (for debugging)
app.use((req, res, next) => {
  console.log(`➡️ Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

// ✅ Step 6: Use your route handlers
app.use(routes);

// ✅ Step 7: Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Step 8: Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
