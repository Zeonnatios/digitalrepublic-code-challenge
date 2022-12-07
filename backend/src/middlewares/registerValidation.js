const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');

const MIN_PASSWORD_LENGTH = 8;
const CPF_LENGTH = 9;

const validator = (name, cpf, email, password) => {
  const { error } = Joi.object({
    name: Joi.string()
      .required(),
    cpf: Joi.string()
      .min(CPF_LENGTH)
      .max(CPF_LENGTH)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(MIN_PASSWORD_LENGTH)
      .required(),
  }).validate({ name, cpf, email, password });
  return error;
};

const registerValidation = (req, _res, next) => {
  const { name, cpf, email, password } = req.body;
  const isNotValid = validator(name, cpf, email, password);
  if (isNotValid) {
    return next({
      status: StatusCodes.UNAUTHORIZED,
      message: isNotValid.message,
    });
  }
  return next();
};

module.exports = { registerValidation };
