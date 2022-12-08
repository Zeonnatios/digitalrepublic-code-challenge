const { validateToken } = require('./tokenValidation');
const { loginValidation } = require('./loginValidation');
const { registerValidation } = require('./registerValidation');
const { accountValidation } = require('./accountValidation');
const { transferValidation } = require('./transferValidation');

module.exports = { validateToken,
  loginValidation,
  registerValidation,
  accountValidation,
  transferValidation };
