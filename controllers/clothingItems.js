const ClothingItem = require("../models/clothingItem");
const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");

// GET /items — public
module.exports.getClothingItems = async (req, res, next) => {
  try {
    const items = await ClothingItem.find({});
    res.send(items);
  } catch (err) {
    next(err);
  }
};

// POST /items — protected
module.exports.createClothingItem = async (req, res, next) => {
  try {
    const { name, weather, imageUrl } = req.body;
    const owner = req.user._id;

    const item = await ClothingItem.create({ name, weather, imageUrl, owner });
    res.status(201).send(item);
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Invalid item data"));
    }
    return next(err);
  }
};

// DELETE /items/:itemId — protected
module.exports.deleteClothingItem = async (req, res, next) => {
  try {
    const item = await ClothingItem.findById(req.params.itemId);

    if (!item) {
      throw new NotFoundError("Item not found");
    }

    if (item.owner.toString() !== req.user._id) {
      throw new ForbiddenError("You cannot delete another user's item");
    }

    await item.deleteOne();
    res.send({ message: "Item deleted" });
  } catch (err) {
    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid item ID"));
    }
    return next(err);
  }
};

// PUT /items/:itemId/likes — protected
module.exports.likeItem = async (req, res, next) => {
  try {
    const item = await ClothingItem.findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );

    if (!item) {
      throw new NotFoundError("Item not found");
    }

    res.send(item);
  } catch (err) {
    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid item ID"));
    }
    return next(err);
  }
};

// DELETE /items/:itemId/likes — protected
module.exports.dislikeItem = async (req, res, next) => {
  try {
    const item = await ClothingItem.findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    );

    if (!item) {
      throw new NotFoundError("Item not found");
    }

    res.send(item);
  } catch (err) {
    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid item ID"));
    }
    return next(err);
  }
};
