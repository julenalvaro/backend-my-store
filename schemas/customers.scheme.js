const Joi = require('joi');

//el id es un id aleatorio único
const id = Joi.string().guid({ version: 'uuidv4' });
const customerId = Joi.number()
const dirPostal = Joi.string()
const numTarjeta = Joi.string()

const createCustomerSchema = Joi.object({
  customerId: customerId.required(),
  dirPostal: dirPostal.required(),
  numTarjeta: numTarjeta.required(),
});

const updateCustomerSchema = Joi.object({
  dirPostal: dirPostal,
  numTarjeta: numTarjeta,
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema };
