const { Model, DataTypes } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model');

const PRODUCTS_TABLE = 'products';

const ProductSchema = {
  id: {
    unique: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },
  descripcion: {
    type: DataTypes.STRING(140),
    allowNull: false,
  },
  isBlocked: {
    field: 'is_blocked',
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  categoryId: {
    field: 'category_id',
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CATEGORY_TABLE,
      key: 'id',
    },
  },
};

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, { as: 'category' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTS_TABLE,
      modelName: 'Product',
      timestamps: false,
    };
  }
}

module.exports = { Product, ProductSchema, PRODUCTS_TABLE };
