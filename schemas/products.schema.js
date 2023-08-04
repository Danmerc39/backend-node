const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(4).max(10);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

const createProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    image: image.required(),
});

const UpdateProductSchema = Joi.object({
    name,
    price,
    image,
});

const getProductSchema = Joi.object({
    id: id.required(),
});

const deleteProductSchema = Joi.object({
    id: id.required(),
});

module.exports = {
    createProductSchema,
    UpdateProductSchema,
    getProductSchema,
    deleteProductSchema,
}
