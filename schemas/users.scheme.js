const Joi = require('joi');

const id = Joi.number().integer().min(1);
const nombre = Joi.string().min(3).max(15);
const email = Joi.string().email();
const edad = Joi.number().min(18).max(80);
const fecha_ingreso = Joi.date();
const password = Joi.string();
const role = Joi.string();

const createUserSchema = Joi.object({
  nombre: nombre.required(),
  email: email.required(),
  edad: edad.required(),
  password: password.required(),
  role: role,
});

const updateUserSchema = Joi.object({
  nombre: nombre,
  email: email,
  edad: edad,
  fecha_ingreso: fecha_ingreso,
  password: password,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const recoverEmailSchema = Joi.object({
  email: email.required(),
});

module.exports = { recoverEmailSchema, createUserSchema, updateUserSchema, getUserSchema };
