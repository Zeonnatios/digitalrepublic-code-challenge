const JWT = require('jsonwebtoken');

const JWT_SECRET = 'secret_key';

const JWT_CONFIG = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

module.exports = (payload) => JWT.sign(payload, JWT_SECRET, JWT_CONFIG);
