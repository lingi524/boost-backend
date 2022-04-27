import Joi from "joi";

const foodItemSchema = Joi.object({
    id: Joi.string().alphanum().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    vegetarian: Joi.bool().required(),
    image: Joi.string().required(),
    allergies: Joi.array().items(Joi.string()).required()
});

export { foodItemSchema }