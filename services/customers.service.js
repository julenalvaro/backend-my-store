const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");
const bcrypt = require('bcrypt');


class CustomersService {

  async create(data) {
    const hashedPassword = await bcrypt.hash(data.user.password, 10);
    data.user.password = hashedPassword;
    const newCustomer = await models.Customer.create(data, { include: ['user'] });

    //devolvemos el newCustomer pero sin el password
    const { password, ...userData } = newCustomer.user.dataValues;
    newCustomer.user.dataValues = userData;

    return newCustomer.dataValues;
  }

  async find() {
    const data = await models.Customer.findAll();
    return data;
  }

  async findByUser(id) {
    const customer = await models.Customer.findOne({
      where: { userId: id },
      include: ['user'],
    });
    return customer;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id, {
      include: ['user'],
    });
    if (!customer) {
      throw boom.notFound("Customer not found");
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id)
    const updatedCustomer = await customer.update(changes);
    return updatedCustomer;
  }

  async delete(id) {
    const customer = await this.findOne(id)
    await customer.destroy();
    return customer;
  }
}

module.exports = CustomersService;
