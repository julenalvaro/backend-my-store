const faker = require("faker");
const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");

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
      include: ['customer'],
    });
    if (!order) {
      throw boom.notFound("Order not found");
    }
    return order;
  }

  async update(id, changes) {
    const order = await this.fincOne(id);
    const updatedOrder = await order.update(changes);
    return updatedOrder;
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return order;
  }
}

module.exports = OrdersService;
