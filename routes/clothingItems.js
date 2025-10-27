const express = require("express");
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const {
  validateCreateItem,
  validateItemId,
} = require("../middlewares/validation");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", getClothingItems);
router.post("/", auth, validateCreateItem, createClothingItem);
router.delete("/:itemId", auth, validateItemId, deleteClothingItem);
router.put("/:itemId/likes", auth, validateItemId, likeItem);
router.delete("/:itemId/likes", auth, validateItemId, dislikeItem);

module.exports = router;
