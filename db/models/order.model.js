const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {
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
};

class Order extends Model {
  static associate(models) {
    Order.belongsTo(models.Customer, { as: 'customer' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false,
    }
  }
}

module.exports = { Order, OrderSchema, ORDER_TABLE };
