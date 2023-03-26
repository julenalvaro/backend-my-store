const Joi = require('joi');

const id = Joi.number();
const nombre = Joi.string().min(3).max(50);
const descripcion = Joi.string().min(3).max(400);

const createCategorySchema = Joi.object({
  nombre: nombre.required(),
  descripcion: descripcion.required(),
});

const updateCategorySchema = Joi.object({
  nombre: nombre,
  descripcion: descripcion
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema };
