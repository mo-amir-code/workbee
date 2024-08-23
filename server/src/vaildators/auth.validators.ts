import Joi from "joi";

const loginValidator = Joi.object({
  email: Joi.string().email().lowercase(),
  username: Joi.string().lowercase(),
  password: Joi.string().min(6).max(12).required(),
}).xor("email", "username");

const registerValidator = Joi.object({
  name: Joi.string().min(3).required(),
  username: Joi.string().lowercase().min(3).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).max(12).required(),
});

const verifyOTPValidator = Joi.object({
  otp: Joi.string().min(6).max(8).required(),
  otptoken: Joi.string().min(16).required(),
});

const forgotPasswordValidator = Joi.object({
  email: Joi.string().email().lowercase(),
  username: Joi.string().email().lowercase(),
}).xor("email", "username");

const resetPasswordValidator = Joi.object({
  otp: Joi.string().min(6).max(8).required(),
  otptoken: Joi.string().min(16).required(),
  newPassword: Joi.string().min(6).max(12).required()
});

export {
  loginValidator,
  registerValidator,
  verifyOTPValidator,
  forgotPasswordValidator,
  resetPasswordValidator
};
