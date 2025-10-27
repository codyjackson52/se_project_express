// 404 — thrown when a requested resource or route does not exist
// Example: user/item ID not found in the database
class NotFoundError extends Error {
  constructor(message = "Resource not found") {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
