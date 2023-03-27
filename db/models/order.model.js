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
  total: {
    //campo virtual que se calcula en base a la tabla intermedia
    type: DataTypes.VIRTUAL,
    get() {
      //ir a todos los productos de la tabla intermedia que pertenecen a este pedido y sumar los precios * cantidad de cada uno
      if(this.products) {
        return this.products.reduce((total, product) => {
          return total + product.precio * product.OrderProduct.cantidad;
        }, 0);
      }
      return 0;
    }
  },
};

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, { as: 'customer' });
    this.belongsToMany(models.Product, {
      through: models.OrderProduct,
      foreignKey: 'orderId',
      as: 'products',
    });
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
