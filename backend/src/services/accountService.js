const { StatusCodes } = require('http-status-codes');
const { numberGenerator } = require('../helpers/accountNumberGenerator');
const { Account } = require('../database/models');

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

module.exports = { createAccount, findAllAccounts, findAccountByUserId };
