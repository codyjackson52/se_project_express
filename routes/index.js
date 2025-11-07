const router = require("express").Router();
const auth = require("../middlewares/auth");
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");

const { login, createUser } = require("../controllers/users");
const { getClothingItems } = require("../controllers/clothingItems");
const {
  validateLogin,
  validateCreateUser,
} = require("../middlewares/validation");
const NotFoundError = require("../errors/NotFoundError");

// Public routes
router.post("/signin", validateLogin, login);
router.post("/signup", validateCreateUser, createUser);
router.get("/items", getClothingItems);

// Auth-protected routes
router.use(auth);
router.use("/users", userRoutes);
router.use("/items", itemRoutes);

// Catch-all 404
router.use("*", (req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
