const ClothingItem = require("../models/clothingItem");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

// GET /items
module.exports.getClothingItems = (req, res, next) => {
  return ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(next);
};

// POST /items
module.exports.createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  return ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid item data"));
      }
      return next(err);
    });
};

// DELETE /items/:itemId
module.exports.deleteClothingItem = (req, res, next) => {
  const { itemId } = req.params;

  return ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        throw new NotFoundError("Item not found");
      }
      if (String(item.owner) !== String(req.user._id)) {
        throw new ForbiddenError("You can only delete your own items");
      }
      return item.deleteOne();
    })
    .then(() => res.send({ message: "Item deleted" }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item id"));
      }
      return next(err);
    });
};

// PUT /items/:itemId/likes
module.exports.likeItem = (req, res, next) => {
  const { itemId } = req.params;

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        throw new NotFoundError("Item not found");
      }
      return res.send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item id"));
      }
      return next(err);
    });
};

// DELETE /items/:itemId/likes
module.exports.dislikeItem = (req, res, next) => {
  const { itemId } = req.params;

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        throw new NotFoundError("Item not found");
      }
      return res.send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item id"));
      }
      return next(err);
    });
};
