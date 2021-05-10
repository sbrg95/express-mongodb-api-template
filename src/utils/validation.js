import Joi from 'joi';

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(24).required(),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(24).required(),
});

const updateUserSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(6).max(24),
});

const todoSchema = Joi.object({
  todo: Joi.string().required(),
  completed: Joi.boolean(),
});

const validate = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    res.status(400).json({
      errors: err.details,
    });
  }
};

export const signupValidation = validate(signupSchema);
export const signinValidation = validate(signinSchema);
export const updateUserValidation = validate(updateUserSchema);
export const todoValidation = validate(todoSchema);
