const { StatusCodes } = require('http-status-codes');
const { numberGenerator } = require('../helpers/accountNumberGenerator');
const { Account, sequelize } = require('../database/models');

const findAllAccounts = async () => {
  const accounts = await Account.findAll();
  return accounts;
};

const findAccountByUserId = async (userId) => {
  const account = await Account.findOne({ where: { userId } });
  return account;
};

const createAccount = async (amount, userId, transaction) => {
  const accountNumber = numberGenerator();
  const account = { accountNumber, amount, userId };
  const accountCreated = await Account.create(account, transaction);

  return accountCreated;
};

const deposit = async (userId, value) => {
  const transaction = await sequelize.transaction();
  try {
    const accountByUserId = await findAccountByUserId(userId);
    const amount = Number(accountByUserId.dataValues.amount) + value;
    await Account.update({ amount }, { where: { userId }, transaction });
    await transaction.commit();
    const account = await findAccountByUserId(userId);
    return account;
  } catch (err) {
    await transaction.rollback();
    return { error: true, message: 'Error when trying to deposit!', status: StatusCodes.BAD_REQUEST };
  }
};

const withdraw = async (userId, value) => {
  const transaction = await sequelize.transaction();

  try {
    const accountByUserId = await findAccountByUserId(userId);
    const amount = Number(accountByUserId.dataValues.amount) - value;
    if (amount < 0) {
      return { error: true, message: 'User already exists!', status: StatusCodes.CONFLICT };
    }

    await Account.update({ amount }, { where: { userId } });
    await transaction.commit();
    const account = await findAccountByUserId(userId);
    return account;
  } catch (err) {
    await transaction.rollback();
    return { error: true, message: 'Error when trying to deposit!', status: StatusCodes.BAD_REQUEST };
  }
};

module.exports = { createAccount, findAllAccounts, findAccountByUserId, deposit, withdraw };
