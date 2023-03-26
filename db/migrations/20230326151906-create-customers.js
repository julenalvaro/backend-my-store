'use strict';

const { CustomerSchema, CUSTOMER_TABLE } = require('../models/customer.model');

module.exports = {
  async up (queryInterface) {
    //crear la tabla customers
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
  },

  async down (queryInterface) {
    //borrar la tabla customers
    await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
