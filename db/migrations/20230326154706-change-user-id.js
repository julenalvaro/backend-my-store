'use strict';

const { CustomerSchema, CUSTOMER_TABLE } = require('../models/customer.model');

module.exports = {
  async up (queryInterface) {
    //modificar la columna userId de la tabla customers
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', CustomerSchema.userId);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  }
};
