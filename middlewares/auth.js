const jwt = require("jsonwebtoken");
const { UNAUTHORIZED } = require("../utils/errors");
const { JWT_SECRET = "some-secret-key" } = require("../utils/config");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // Check if the Authorization header exists and starts with 'Bearer '
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(UNAUTHORIZED).send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(UNAUTHORIZED).send({ message: "Invalid token" });
  }

  req.user = payload; // Assign the payload (_id) to req.user
  next(); // Move on to the next middleware
};
