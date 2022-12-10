const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');

const MIN_PASSWORD_LENGTH = 8;

const validator = (email, password) => {
  const { error } = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(MIN_PASSWORD_LENGTH)
      .required(),
  }).validate({ email, password });
  return error;
};

const loginValidation = (req, _res, next) => {
  const { email, password } = req.body;
  const isNotValid = validator(email, password);
  if (isNotValid) {
    return next({
      status: StatusCodes.UNAUTHORIZED,
      message: isNotValid.message,
    });
  }
  return next();
};

module.exports = { loginValidation };
