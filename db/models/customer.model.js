const { Model, DataTypes, Sequelize } = require('sequelize');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dirPostal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numTarjeta: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

class Customer extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false,
    };
  }
}

module.exports = { Customer, CustomerSchema, CUSTOMER_TABLE };
