const { StatusCodes } = require('http-status-codes');
const { numberGenerator } = require('../helpers/accountNumberGenerator');
const { Account } = require('../database/models');

const findAllAccounts = async () => {
  const accounts = await Account.findAll();
  return accounts;
};

const createAccount = async (amount, userId) => {
  const accountNumber = numberGenerator();
  const newAccountObjectFormatted = { accountNumber, amount, userId };
  const accountCreated = await Account.create(newAccountObjectFormatted);

  return accountCreated;
};

const withdraw = async (userId, amount) => {

};

const deposit = async (userId, amount) => {

};

module.exports = { createAccount, findAllAccounts };
