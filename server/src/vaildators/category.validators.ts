import Joi from "joi";

const createCategoryValidator = Joi.object({
    name: Joi.string().min(2).max(200).required(),
    slug: Joi.string().min(2).max(100).required(),
});


export {
    createCategoryValidator
}