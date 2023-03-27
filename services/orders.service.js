const faker = require("faker");
const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");
const { OrderProduct } = require("../db/models/order-product.model");

class OrdersService {

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async find() {
    const data = await models.Order.findAll();
    return data;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: "customer",
          include: ["user"]
        },
        {
          association: "products",
        }
      ]
    });
    if (!order) {
      throw boom.notFound("Order not found");
    }
    return order;
  }

  async addItem(data) {
    const order = await this.findOne(data.orderId);
    const product = await models.Product.findByPk(data.productId);
    if (!product) {
      throw boom.notFound("Product not found");
    }
    await models.OrderProduct.create(data);
    return data;
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return order;
  }
}

module.exports = OrdersService;
