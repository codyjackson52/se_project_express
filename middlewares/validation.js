const { celebrate, Joi, Segments } = require("celebrate");
const validator = require("validator");

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) return value;
  return helpers.error("string.uri");
};

module.exports.validateCreateUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().required().custom(validateUrl),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.validateLogin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.validateUpdateProfile = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().required().custom(validateUrl),
  }),
});

module.exports.validateCreateItem = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    weather: Joi.string().valid("hot", "warm", "cold").required(),
    imageUrl: Joi.string().required().custom(validateUrl),
  }),
});

module.exports.validateItemId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required(),
  }),
});
