const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');

const MIN_AMOUNT = 1;

const validator = (amount) => {
  const { error } = Joi.object({
    amount: Joi.number()
      .min(MIN_AMOUNT)
      .required(),
  }).validate({ amount });
  return error;
};

const accountValidation = (req, _res, next) => {
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

module.exports = { accountValidation };
