const boom = require("@hapi/boom");

const { models } = require('../libs/sequelize');

class CategoriesService {

  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const data = await models.Category.findAll();
    return data;
  }

  async findOne(id) {
    const categoryProducts = await models.Category.findByPk(id, {
      include: ['products'],
    });

    return categoryProducts;
  }
  update(id, changes) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.categories.findIndex((item) => item.id === id);
        if (index === -1) {
          reject(boom.notFound("Category not found"));
        }
        const category = this.categories[index];
        this.categories[index] = {
          ...category,
          ...changes,
        };
        resolve(this.categories[index]);
      }, 300);
    });
  }
  delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.categories.findIndex((item) => item.id === id);
        if (index === -1) {
          reject(boom.notFound("Category not found"));
        }
        this.categories.splice(index, 1);
        resolve();
      }, 300);
    });
  }
}

module.exports = CategoriesService;
