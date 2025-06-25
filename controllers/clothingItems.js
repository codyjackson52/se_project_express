const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

// GET all items
module.exports.getClothingItems = (req, res) => ClothingItem.find({}) // ✅ ADDED return
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      return res // ✅ ADDED return for consistency
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server" });
    });

// POST create new item
module.exports.createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  return ClothingItem.create({ name, weather, imageUrl, owner: req.user._id }) // ✅ return
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item data" }); // ✅ return
      }
      return res // ✅ return added
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};

// DELETE an item by ID
module.exports.deleteClothingItem = (req, res) => ClothingItem.findByIdAndDelete(req.params.itemId) // ✅ return
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item ID" }); // ✅ return
      }
      if (err.statusCode === NOT_FOUND) {
        return res.status(NOT_FOUND).send({ message: err.message }); // ✅ return
      }
      return res // ✅ return added
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server" });
    });

// PUT like item
module.exports.likeItem = (req, res) => ClothingItem.findByIdAndUpdate(
    // ✅ return
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item ID" }); // ✅ return
      }
      if (err.statusCode === NOT_FOUND) {
        return res.status(NOT_FOUND).send({ message: err.message }); // ✅ return
      }
      return res // ✅ return added
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server" });
    });

// DELETE dislike item
module.exports.dislikeItem = (req, res) => ClothingItem.findByIdAndUpdate(
    // ✅ return
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item ID" }); // ✅ return
      }
      if (err.statusCode === NOT_FOUND) {
        return res.status(NOT_FOUND).send({ message: err.message }); // ✅ return
      }
      return res // ✅ return added
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server" });
    });
