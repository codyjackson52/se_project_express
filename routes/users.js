const router = require("express").Router();
const { getCurrentUser, updateUserProfile } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { validateUpdateProfile } = require("../middlewares/validation");

router.use(auth);
router.get("/me", getCurrentUser);
router.patch("/me", validateUpdateProfile, updateUserProfile);

module.exports = router;
