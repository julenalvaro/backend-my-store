const Joi = require('joi');

const id = Joi.string().uuid();
const fecha = Joi.date();
const customerId = Joi.string().uuid();
const total = Joi.number().min(0);

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
  total: total.required(),
});

const updateOrderSchema = Joi.object({
  fecha: fecha,
  customerId: customerId,
  total: total,
});

const getOrderSchema = Joi.object({
  id: id.required(),
});

module.exports = { createOrderSchema, updateOrderSchema, getOrderSchema };
