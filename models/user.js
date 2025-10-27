const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [30, "Name must be at most 30 characters long"],
    },
    avatar: {
      type: String,
      required: [true, "Avatar URL is required"],
      validate: {
        validator: (v) => validator.isURL(v),
        message: "Invalid URL format for avatar",
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, // hides password by default
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
