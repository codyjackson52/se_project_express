const router = require("express").Router();
const auth = require("../middlewares/auth");
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");
const login = require("../controllers/login");
const { createUser } = require("../controllers/users");
const { NOT_FOUND } = require("../utils/errors");

// Public routes
router.post("/signin", login);
router.post("/signup", createUser);

// Auth middleware — protects everything below
router.use(auth);

// Protected routes
router.use("/users", userRoutes);
router.use("/items", itemRoutes);

// 404 Catch-all
router.use("*", (req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
