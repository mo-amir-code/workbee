import Joi from "joi"

const loginValidator = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).max(12).required()
});

const registerValidator = Joi.object({
    name: Joi.string().min(3).required(),
    username: Joi.string().min(3).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).max(12).required()
});


export {
    loginValidator,
    registerValidator
}