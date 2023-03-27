
const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");
const { Op } = require('sequelize');

class ProductsService {

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(params) {
    const options = {
      include: ['category'],
      where:{}
    }

    const { limit, offset, precio, minPrecio, maxPrecio } = params;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    if (precio) {
      options.where.precio = precio;
    }

    if (minPrecio) {
      options.where.precio = { ...options.where.precio, [Op.gte]: minPrecio };
    }

    if (maxPrecio) {
      options.where.precio = { ...options.where.precio, [Op.lte]: maxPrecio };
    }

    const productos = await models.Product.findAll(options);

    return productos;
  }

  async findOne(id) {
    const producto = await models.Product.findByPk(id, {
      include: ['category'],
    });
    if (!producto) {
      throw boom.notFound("Product not found");
    }
    return producto;
  }

  update(id, changes) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.products.findIndex((item) => item.id === id);
        if (index === -1) {
          reject(boom.notFound("Product not found"));
        }
        const product = this.products[index];
        this.products[index] = {
          ...product,
          ...changes,
        };
        resolve(this.products[index]);
      }, 300);
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.products.findIndex((item) => item.id === id);
        if (index === -1) {
          reject(boom.notFound("Product not found"));
        }
        this.products.splice(index, 1);
        resolve({ id });
      }, 300);
    });
  }
}

//exportamos

module.exports = ProductsService;
