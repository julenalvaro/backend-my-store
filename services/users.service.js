const faker = require("faker");
const boom = require("@hapi/boom");
const { models } = require("./../libs/sequelize");
const bcrypt = require("bcrypt");


class UsersService {

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash,
  });
    //devolvemos el newUser pero sin el password
    const { password, ...userData } = newUser.dataValues;
    return userData;
  }

  async find() {
    const data = await models.User.findAll({
      include: ['customer'],
    });
    return data;
  }

  async findUserByEmail(email) {
    const user = await models.User.findOne({
      where: { email }
    });
    return user;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound("User not found");
    }
    //devolvemos el usuario sin la password
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id)
    const updatedUser = await user.update(changes);
    return updatedUser;
  }

  async delete(id) {
    const user = await this.findOne(id)
    await user.destroy();
    return user;
  }
}

module.exports = UsersService;
