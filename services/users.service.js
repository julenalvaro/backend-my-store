const faker = require("faker");
const boom = require("@hapi/boom");
const pool = require("../libs/postgres.pool");

class UsersService {
  constructor() {
    this.users = [];
    this.generateRandomUsers();
    this.pool = pool;
    this.pool.on('error', (err, client) => {
      console.error('Unexpected error on idle client', err)
      process.exit(-1)
    });
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

  create(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newUser = {
          id: faker.datatype.uuid(),
          ...data,
        };
        this.users.push(newUser);
        resolve(newUser);
      }, 300);
    });
  }

  async find() {
    //hacemos la búsqueda con el pool
    const client = await this.pool.connect();
    const result = await client.query('SELECT * FROM prueba');
    client.release();
    return result.rows;
  }

  findOne(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find((item) => item.id === id);
        if (!user) {
          reject(boom.notFound("User not found"));
        }
        resolve (user);
      }, 300);
    });
  }

  update(id, changes) {
    return new Promise ((resolve, reject) => {
      setTimeout(() => {
      const index = this.users.findIndex((item) => item.id === id);
      if (index === -1) {
        reject(boom.notFound("User not found"));
      }
      const user = this.users[index];
      this.users[index] = {
        ...user,
        ...changes,
      };
      resolve (this.users[index]);
      }, 300);
    });
  }

  delete(id) {
    return new Promise ((resolve, reject) => {
      setTimeout(() => {
        const index = this.users.findIndex((item) => item.id === id);
        if (index === -1) {
          reject(boom.notFound("User not found"));
        } else {
          this.users.splice(index, 1);
          resolve({ id });
        }
      }, 300);
    });
  }
}

module.exports = UsersService;
