const Joi = require('joi');

//el id es un id aleatorio único
const id = Joi.string().guid({ version: 'uuidv4' });
const userId = Joi.number()
const dirPostal = Joi.string()
const numTarjeta = Joi.string()
const nombre = Joi.string().min(3).max(15);
const email = Joi.string().email();
const edad = Joi.number().min(18).max(80);
const password = Joi.string();

const createCustomerSchema = Joi.object({
  dirPostal: dirPostal.required(),
  numTarjeta: numTarjeta.required(),
  user: Joi.object({
    nombre: nombre.required(),
    email: email.required(),
    edad: edad.required(),
    password: password.required(),
  }),
});

const updateCustomerSchema = Joi.object({
  dirPostal: dirPostal,
  numTarjeta: numTarjeta,
  userId: userId,
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema };
