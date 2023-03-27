const { Model, DataTypes } = require('sequelize');
const { ORDER_TABLE } = require('./order.model');
const { PRODUCTS_TABLE } = require('./product.model');

const ORDER_PRODUCT_TABLE = 'order_product';

const OrderProductSchema = {
  id: {
    unique: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  orderId: {
    field: 'order_id',
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: ORDER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  productId: {
    field: 'product_id',
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PRODUCTS_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

class OrderProduct extends Model {
  static associate(models) {
    this.belongsTo(models.Order, { as: 'order' });
    this.belongsTo(models.Product, { as: 'product' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      timestamps: false,
    };
  }
}

module.exports = { OrderProduct, OrderProductSchema, ORDER_PRODUCT_TABLE };
