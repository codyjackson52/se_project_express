const router = require("express").Router();
const auth = require("../middlewares/auth");
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");
const login = require("../controllers/login");
const { createUser } = require("../controllers/users");
const { getClothingItems } = require("../controllers/clothingItems");
const { NOT_FOUND } = require("../utils/errors");

// Public routes
router.post("/signin", login);
router.post("/signup", createUser);
router.get("/items", getClothingItems); // ✅ public only

// Protect everything else
router.use(auth);

// Protected routes
router.use("/users", userRoutes);
router.use("/items", itemRoutes); // ✅ now only protected routes inside

// Catch-all 404
router.use("*", (req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
