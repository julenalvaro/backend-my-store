const faker = require("faker");
const boom = require("@hapi/boom");
const { models } = require("./../libs/sequelize");
const bcrypt = require("bcrypt");


class UsersService {
  constructor() {
    this.users = [];
    this.generateRandomUsers();
  }

  generateRandomUsers() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        nombre: faker.name.findName(),
        email: faker.internet.email(),
        edad: faker.datatype.number({ min: 18, max: 80 }),
        fecha_ingreso: faker.date.past()
      });
    }
  }

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
