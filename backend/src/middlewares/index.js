const { validateToken } = require('./tokenValidation');
const { loginValidation } = require('./loginValidation');
const { registerValidation } = require('./registerValidation');
const { accountValidation } = require('./accountValidation');

module.exports = { validateToken, loginValidation, registerValidation, accountValidation };
