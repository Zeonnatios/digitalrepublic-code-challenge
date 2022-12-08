const { StatusCodes } = require('http-status-codes');
const service = require('../services/accountService');

const createAccount = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const { id: userId } = req.authenticatedUser;
    const data = await service.createAccount(amount, userId);
    if (data.error) return next(data);

    return res.status(StatusCodes.OK).json();
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

module.exports = { createAccount };
