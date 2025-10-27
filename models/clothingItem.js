const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 2,
      maxlength: 30,
    },
    weather: {
      type: String,
      required: [true, "Weather type is required"],
      enum: ["hot", "warm", "cold"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      validate: {
        validator: (v) => validator.isURL(v),
        message: "Invalid URL format",
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: [],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("clothingItem", clothingItemSchema);
