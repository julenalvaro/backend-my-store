'use strict';

const { CustomerSchema, CUSTOMER_TABLE } = require('../models/customer.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    //actualizar la tabla CUSTOMER_TABLE con el cambio de tipo de dato de numTarjeta de NUMBER a BIGINT
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'numTarjeta', CustomerSchema.numTarjeta);
  },

  async down (queryInterface, Sequelize) {
    //revertir el cambio de tipo de dato de numTarjeta de BIGINT a NUMBER
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'numTarjeta', {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 18,
        max: 80,
      },
    });
  }
};
