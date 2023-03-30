const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const AuthService = require('../../../services/auth.service');
const boom = require('@hapi/boom')

const authService = new AuthService();

const localStrategy = new LocalStrategy({
    usernameField: 'email' // especificar que el campo de contraseña es el campo 'password'
  },
  async (email, password, done) => {
    try {
      //le pasamos el email y el password al servicio de autenticación
      const user = await authService.login(email, password);
      //retornar el usuario con el password eliminado
      done(null, user);
  } catch(error){
      done(error, false);
  }
});

module.exports = localStrategy;
