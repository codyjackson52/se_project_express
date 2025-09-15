const express = require("express");
const auth = require("../middlewares/auth");
const {
  getClothingItems, // ✅ import this
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

const router = express.Router();

router.get("/", getClothingItems); // ✅ add this line

router.post("/", createClothingItem);
router.delete("/:itemId", auth, deleteClothingItem);
router.put("/:itemId/likes", auth, likeItem);
router.delete("/:itemId/likes", auth, dislikeItem);

module.exports = router;
