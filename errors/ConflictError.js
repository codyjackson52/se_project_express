// 409 — thrown when a request conflicts with the current state of the server
// Example: trying to register with an email that already exists
class ConflictError extends Error {
  constructor(message = "Conflict") {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
