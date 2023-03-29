const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const UsersService = require('../../../services/users.service');
const boom = require('@hapi/boom')

const service = new UsersService();

const localStrategy = new LocalStrategy({
    usernameField: 'email' // especificar que el campo de contraseña es el campo 'password'
  },
  async (email, password, done) => {
    try {
      const user = await service.findUserByEmail(email)
      if(!user){
        done(boom.unauthorized(), false);
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        done(boom.unauthorized(), false);
      }
      delete user.dataValues.password;
      //retornar el usuario con el password eliminado
      done(null, user);
  } catch(error){
      done(error, false);
  }
});

module.exports = localStrategy;
