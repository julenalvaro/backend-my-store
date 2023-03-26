const Joi = require('joi');

const id = Joi.string().uuid();
const nombre = Joi.string().min(3).max(60);
const precio = Joi.number().min(1.5);
const imagen = Joi.string().uri();
const descripcion = Joi.string().min(10).max(140);
const isBlocked = Joi.boolean();
const categoryId = Joi.number().min(1);

const createProductSchema = Joi.object({
  nombre: nombre.required(),
  precio: precio.required(),
  imagen: imagen.required(),
  isBlocked: isBlocked.required(),
  descripcion: descripcion.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  nombre: nombre,
  precio: precio,
  imagen: imagen,
  descripcion: descripcion,
  isBlocked: isBlocked,
  categoryId: categoryId,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
