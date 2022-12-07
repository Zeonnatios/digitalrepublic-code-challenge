const { StatusCodes } = require('http-status-codes');

const md5 = require('md5');

const { User } = require('../database/models');
const createToken = require('../helpers/generateToken');

// eslint-disable-next-line consistent-return
const login = async (req, res) => {
  try {
    const { email, password: loginPassword } = req.body;
    const user = await User.findOne({ where: { email }, raw: true });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'E-mail or password incorrect!' });
    }

    const md5Password = md5(loginPassword);

    if (user.password !== md5Password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User not Found' });
    }
    const payload = {
      id: user.id, name: user.name, email, cpf: user.cpf,
    };
    const token = await createToken(payload);

    return res.status(StatusCodes.OK).json({ token, user: payload });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

module.exports = { login };
