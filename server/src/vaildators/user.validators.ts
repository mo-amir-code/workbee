import Joi from "joi";

const createTaskValidator = Joi.object({
    solanaTaskId:Joi.string(),
    user:Joi.number().required(),
    title:Joi.string().required(),
    description:Joi.string().required(),
    category:Joi.number().required(),
    prizeAmount:Joi.number().required(),
    expiryTime:Joi.date().iso().required(),
});


export {
    createTaskValidator
}