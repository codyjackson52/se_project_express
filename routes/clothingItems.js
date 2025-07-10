const express = require("express");
const auth = require("../middlewares/auth");
const {
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

const router = express.Router();

router.post("/", auth, createClothingItem);
router.delete("/:itemId", auth, deleteClothingItem);
router.put("/:itemId/likes", auth, likeItem);
router.delete("/:itemId/likes", auth, dislikeItem);

module.exports = router;
