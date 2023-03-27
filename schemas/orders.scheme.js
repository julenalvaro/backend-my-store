const Joi = require('joi');

//relacion 1:1 con users
const id = Joi.string().uuid();
const customerId = Joi.string().uuid();

//relacion n:n con products
const productId = Joi.number().min(1);
const orderId = Joi.string().uuid();
const cantidad = Joi.number().min(1);


const addItemSchema = Joi.object({
  productId: productId.required(),
  orderId: orderId.required(),
  cantidad: cantidad.required(),
});

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});

const getOrderSchema = Joi.object({
  id: id.required(),
});

module.exports = { createOrderSchema, getOrderSchema, addItemSchema };




