'use strict';

const { USER_TABLE, UserSchema } = require('./../models/user.model')

module.exports = {
  async up (queryInterface, Sequelize) {
    //añadir el campo recoveryToken a la tabla users
    await queryInterface.addColumn(USER_TABLE, 'recovery_token', UserSchema.recoveryToken);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE, 'recovery_token');
  }
};
