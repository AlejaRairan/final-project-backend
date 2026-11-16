const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateUrl = (value, helpers) => {
  if (validator.isURL(value, { require_protocol: true })) {
    return value;
  }
  return helpers.error('string.uri');
};

module.exports.validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateCountry = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    capital: Joi.string().required(),
    region: Joi.string().required(),
    flag: Joi.string().required().custom(validateUrl),
    landscape: Joi.string().custom(validateUrl).allow('', null),
    description: Joi.string().allow('', null),
  }),
});

module.exports.validateCountryId = celebrate({
  params: Joi.object().keys({
    countryId: Joi.string().hex().length(24).required(),
  }),
});