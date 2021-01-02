const status = require("http-status-codes");

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = status.NOT_FOUND;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = status.UNAUTHORIZED;
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = status.INTERNAL_SERVER_ERROR;
  }
}

class BadInputError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = status.BAD_REQUEST;
  }
}

module.exports = { NotFoundError, UnauthorizedError, InternalServerError, BadInputError };
