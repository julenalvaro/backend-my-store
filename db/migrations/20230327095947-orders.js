'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('../models/customer.model');
const { ORDER_TABLE } = require('../models/order.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      customerId: {
        type: DataTypes.UUID,
        field: 'customer_id',
        allowNull: false,
        references: {
          model: CUSTOMER_TABLE,
          key: 'id',
        },
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ORDER_TABLE);
  }
};
