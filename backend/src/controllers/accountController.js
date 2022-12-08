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

const getAllAccounts = async (req, res) => {
  try {
    const accounts = await service.findAllAccounts();
    return res.status(StatusCodes.OK).json({ accounts });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const getAccountById = async (req, res) => {
  try {
    const { id: userId } = req.authenticatedUser;
    const account = await service.findAccountByUserId(userId);
    return res.status(StatusCodes.OK).json({ account });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const deposit = async (req, res, next) => {
  try {
    const { id: userId } = req.authenticatedUser;
    const { amount } = req.body;
    const data = await service.deposit(userId, amount);
    if (data.error) return next(data);
    return res.status(StatusCodes.OK).json({ data, message: 'Deposit operation completed successfully!' });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const withdraw = async (req, res, next) => {
  try {
    const { id: userId } = req.authenticatedUser;
    const { amount } = req.body;
    const data = await service.withdraw(userId, amount);
    if (data.error) return next(data);
    return res.status(StatusCodes.OK).json({ account: data, message: 'Withdraw operation completed successfully!' });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

module.exports = { createAccount, getAllAccounts, getAccountById, deposit, withdraw };
