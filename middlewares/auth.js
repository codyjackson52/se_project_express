const jwt = require("jsonwebtoken");
const { UNAUTHORIZED } = require("../utils/errors");
const { JWT_SECRET = "some-secret-key" } = require("../utils/config");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // 🔒 Check for Bearer token
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(UNAUTHORIZED).send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;

    return next(); // ✅ All code paths now return
  } catch (err) {
    return res.status(UNAUTHORIZED).send({ message: "Invalid token" });
  }
};
