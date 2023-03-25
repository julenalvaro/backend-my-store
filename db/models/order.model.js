const { Model, DataTypes } = require('sequelize');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // references: {
    //   model: 'users',
    //   key: 'id',
    // },
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

class Order extends Model {
  // static associate(models) {
  //   Order.belongsTo(models.User, { foreignKey: 'usuarioId', as: 'usuario' });
  //   Order.hasMany(models.OrderProduct, { foreignKey: 'ordenId', as: 'productos' });
  // }

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
