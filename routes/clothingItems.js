const express = require("express");
const auth = require("../middlewares/auth");
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

const router = express.Router();

router.get("/", getClothingItems); // public
router.post("/", auth, createClothingItem); // protected
router.delete("/:itemId", auth, deleteClothingItem); // protected
router.put("/:itemId/likes", auth, likeItem); // protected
router.delete("/:itemId/likes", auth, dislikeItem); // protected

module.exports = router;
