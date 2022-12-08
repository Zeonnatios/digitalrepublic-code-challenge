require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next({ status: StatusCodes.UNAUTHORIZED, message: 'Token not found!' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.authenticatedUser = payload;
    return next();
  } catch (err) {
    return next({ status: StatusCodes.UNAUTHORIZED, message: 'Expired or invalid token!' });
  }
};

module.exports = { validateToken };
