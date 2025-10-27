// 400 — invalid input (e.g., Joi/celebrate validation errors, malformed ObjectId)
// Purpose: to standardize all 400-level validation errors across the app.
class BadRequestError extends Error {
  constructor(message = "Invalid request data") {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
