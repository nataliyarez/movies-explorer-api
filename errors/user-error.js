class UserError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 5000;
  }
}
module.exports = UserError;
