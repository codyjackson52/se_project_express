// utils/config.js
require("dotenv").config();

const { PORT, JWT_SECRET } = process.env;

module.exports = {
  PORT: PORT || 3001,
  JWT_SECRET: JWT_SECRET || "dev-secret",
};
