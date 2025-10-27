// 403 — thrown when a user is authenticated but not allowed to perform the action
// Example: trying to delete another user's clothing item
class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
