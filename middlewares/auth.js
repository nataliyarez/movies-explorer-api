const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;


module.exports = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return next(new Error('AuthorizationError'));
  }
  token = token.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    next(new Error('JsonWebTokenError'));
  }

  req.user = payload;

  return next();
};
