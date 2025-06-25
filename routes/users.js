// routes/users.js

const router = require("express").Router();
const {
  getUsers,
  getUser, // ✅ matches the actual export in controllers/users.js
  createUser,
} = require("../controllers/users");

// ✅ GET all users
router.get("/", getUsers);

// ✅ GET a single user by ID
router.get("/:userId", getUser);

// ✅ POST create a new user
router.post("/", createUser);

module.exports = router;
