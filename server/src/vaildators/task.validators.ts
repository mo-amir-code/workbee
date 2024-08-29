import Joi from "joi";

const taskFilterValidator = Joi.object({
    category:Joi.number().required(),
    limit:Joi.number().required(),
    pageNo:Joi.number().required().max(100),
    sort:Joi.string().required(),
});


export {
    taskFilterValidator
}