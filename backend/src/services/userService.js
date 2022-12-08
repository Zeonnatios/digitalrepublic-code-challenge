const { StatusCodes } = require('http-status-codes');
const md5 = require('md5');
const { User, Account } = require('../database/models');
const generateToken = require('../helpers/generateToken');
const { createAccount } = require('./accountService');

const findAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const findUserByCpf = async (cpf) => {
  const user = await User.findOne({ where: { cpf }, raw: true });
  return user;
};

const getUserById = async (id) => {
  const user = await User.findOne({
    where: { id },
    include: [
      { model: Account, as: 'account' },
    ],
    attributes: { exclude: ['password'] },
    skipLocked: true,
    lock: true,
  });
  return user;
};

const loginAuthenticator = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    return { error: true, message: 'User not found!', status: StatusCodes.NOT_FOUND };
  }

  const encryptedPassword = md5(password);
  if (user.password !== encryptedPassword) {
    return { error: true, status: StatusCodes.UNAUTHORIZED, message: 'Email or password incorrect!' };
  }

  const payload = await getUserById(user.id);
  const token = await generateToken(payload.dataValues);
  return token;
};

const registerAuthenticator = async (name, cpf, email, password) => {
  const userbyEmail = await findUserByEmail(email);
  const userByCpf = await findUserByCpf(cpf);

  if (userbyEmail || userByCpf) {
    return { error: true, message: 'User already exists!', status: StatusCodes.CONFLICT };
  }

  const newUserObjectFormatted = { name, cpf, email, password: md5(password) };
  const userCreated = await User.create(newUserObjectFormatted);

  const userId = userCreated.id;
  // eslint-disable-next-line no-unused-vars
  const accountCreated = await createAccount(0, userId);

  const payload = await getUserById(userId);
  const token = await generateToken(payload.dataValues);
  return token;
};

module.exports = {
  loginAuthenticator,
  registerAuthenticator,
  findAllUsers,
};
