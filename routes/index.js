const router = require("express").Router();
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");
const { NOT_FOUND } = require("../utils/errors"); // ✅ Import 404 constant

console.log("✅ routes/index.js is loaded"); // DEBUG LOG

router.use(
  "/users",
  (req, res, next) => {
    console.log("🛬 /users route hit"); // DEBUG LOG
    next();
  },
  userRoutes
);

router.use(
  "/items",
  (req, res, next) => {
    console.log("🛬 /items route hit"); // DEBUG LOG
    next();
  },
  itemRoutes
);

// Handle all unmatched routes
router.use("*", (req, res) => {
  console.log("❌ Route not found: ", req.originalUrl); // DEBUG LOG
  res.status(NOT_FOUND).send({ message: "Requested resource not found" }); // ✅ Use constant
});

module.exports = router;
