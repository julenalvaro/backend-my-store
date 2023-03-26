'use strict';

const { USER_TABLE, UserSchema } = require('./../models/user.model')

module.exports = {
  async up (queryInterface, Sequelize) {
    //agregar los campos que faltan en la tabla USER_TABLE, role y password
    queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
    queryInterface.addColumn(USER_TABLE, 'password', UserSchema.password);
  },

  async down (queryInterface, Sequelize) {
    //revertir la migración
    queryInterface.removeColumn(USER_TABLE, 'role');
    queryInterface.removeColumn(USER_TABLE, 'password');
  }
};
