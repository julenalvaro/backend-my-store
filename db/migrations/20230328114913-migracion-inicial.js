'use strict';
const { DataTypes } = require('sequelize');
const { USER_TABLE, UserSchema } = require('./../models/user.model')
const { CustomerSchema, CUSTOMER_TABLE } = require('../models/customer.model');
const { CategorySchema, CATEGORY_TABLE } = require('../models/category.model');
const { ProductSchema, PRODUCTS_TABLE } = require('../models/product.model');
const { ORDER_TABLE } = require('../models/order.model');
const { OrderProductSchema, ORDER_PRODUCT_TABLE } = require('../models/order-product.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.dropAllTables();
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCTS_TABLE, ProductSchema);

    //La parte de orders tiene campos ficticios, hay que hacerla sin ellos:
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
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropAllTables();
  }
};
