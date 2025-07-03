const router = require("express").Router();
const {
  getUsers,
  getCurrentUser,
  createUser,
  updateUserProfile,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.patch("/me", updateUserProfile);
router.post("/", createUser);

module.exports = router;
