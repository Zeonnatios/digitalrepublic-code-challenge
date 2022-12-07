const { StatusCodes } = require('http-status-codes');
const service = require('../services/userService');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await service.loginAuthenticator(email, password);
    if (data.error) return next(data);

    return res.status(StatusCodes.OK).json({ token: data });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const register = async (req, res, next) => {
  try {
    const { name, cpf, email, password } = req.body;

    const data = await service.registerAuthenticator(name, cpf, email, password);
    if (data.error) return next(data);

    return res.status(StatusCodes.CREATED).json({ token: data });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

module.exports = { login, register };
