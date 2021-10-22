const Joi = require("joi");
const HttpCode = require("../../helpers/constants");

const schemaSendReview = Joi.object({
  name: Joi.string().min(1).max(25).required(),
  // password: Joi.string().min(6).max(15).required(),
  message: Joi.string().min(1).max(150).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua", "ru"] },
    })
    .required(),
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    return next();
  } catch (err) {
    console.log(err);
    next({
      status: HttpCode.BAD_REQUEST,
      message: `Missing fields: field ${err.message.replace(/"/g, "")}`,
    });
  }
};

module.exports = {
  validationCreateReview: async (req, res, next) => {
    return await validate(schemaSendReview, req.body, next);
  },
};
