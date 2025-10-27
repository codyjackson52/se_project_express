require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const routes = require("./routes");

const { PORT = 3001 } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

// Log all incoming requests
app.use(requestLogger);

// Crash test route (for PM2 recovery testing)
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// Main routes
app.use(routes);

// Log all errors
app.use(errorLogger);

// Celebrate validation errors
app.use(errors());

// Centralized error handler
app.use(errorHandler);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
