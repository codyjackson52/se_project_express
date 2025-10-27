// 401 — thrown when authentication fails (missing or invalid JWT)
// Purpose: to handle all unauthorized access attempts.
class UnauthorizedError extends Error {
  constructor(message = "Authorization required") {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
