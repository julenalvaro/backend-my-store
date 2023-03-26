
const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");

class ProductsService {

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find() {
    const productos = await models.Product.findAll({
      include: ['category'],
    });
    return productos;
  }

  findOne(id) {

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
