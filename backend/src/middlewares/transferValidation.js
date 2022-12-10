const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');

const MIN_AMOUNT = 1;
const MAX_AMOUNT = 2000;

const validator = (amount) => {
  const { error } = Joi.object({
    amount: Joi.number()
      .min(MIN_AMOUNT)
      .max(MAX_AMOUNT)
      .required(),
  }).validate({ amount });
  return error;
};

const transferValidation = (req, _res, next) => {
  const { amount } = req.body;
  const isNotValid = validator(amount);
  if (isNotValid) {
    return next({
      status: StatusCodes.UNAUTHORIZED,
      message: isNotValid.message,
    });
  }
  return next();
};

module.exports = { transferValidation };
