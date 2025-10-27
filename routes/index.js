const router = require("express").Router();
const auth = require("../middlewares/auth");
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");

const { login, createUser } = require("../controllers/users");
const { getClothingItems } = require("../controllers/clothingItems");
const { NOT_FOUND } = require("../utils/errors");

// Public routes
router.post("/signin", login);
router.post("/signup", createUser);
router.get("/items", getClothingItems);

// Auth-protected routes
router.use(auth);
router.use("/users", userRoutes);
router.use("/items", itemRoutes);

// Catch-all 404
router.use("*", (req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
