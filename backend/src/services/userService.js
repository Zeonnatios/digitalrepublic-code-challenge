const { StatusCodes } = require('http-status-codes');

const md5 = require('md5');

const { User } = require('../database/models');
const generateToken = require('../helpers/generateToken');

const findUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email }, raw: true });
  return user;
};

const loginAuthenticator = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    return { error: true, message: 'User not found!', status: StatusCodes.NOT_FOUND };
  }

  const encryptedPassword = md5(password);
  console.log(encryptedPassword);
  if (user.password !== encryptedPassword) {
    return { error: true, status: StatusCodes.UNAUTHORIZED, message: 'Email or password incorrect!' };
  }

  const payload = {
    id: user.id, name: user.name, email, cpf: user.cpf,
  };
  const token = await generateToken(payload);
  return token;
};

module.exports = {
  loginAuthenticator,
};
