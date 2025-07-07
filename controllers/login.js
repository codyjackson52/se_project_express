const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET = "some-secret-key" } = require("../utils/config");
const {
  BAD_REQUEST,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

const login = (req, res) => {
  const { email, password } = req.body;

  // Check if email and password were provided
  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Email and password are required" });
  }

  // Use custom method on User model
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        return res
          .status(UNAUTHORIZED)
          .send({ message: "Incorrect email or password" });
      }

      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred during login" });
    });
};

module.exports = login;
