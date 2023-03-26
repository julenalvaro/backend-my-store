//Esto en origen era un boilerplate para migraciones creado mediante npm run migration:generate -- --name=nombre-migracion

'use strict';

const { USER_TABLE, UserSchema } = require('./../models/user.model')

module.exports = {
  async up (queryInterface) {
    //creamos la tabla USER_TABLE con UserSchema
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },

  //opción para revertir la migración
  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
  }
};
