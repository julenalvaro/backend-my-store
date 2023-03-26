const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 20],
    },
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'customer',
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fechaIngreso: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    field: 'fecha_ingreso',
  },
};

//la clase Model de sequelize tiene todas las herramientas para hacer queries. Tenemos que extenderla a nuestro esquema para poder usarla:

class User extends Model {
  //creamos métodos estáticos para hacer queries
  static associate(){
    //relaciones
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
    }
  }
}

module.exports = { User, UserSchema, USER_TABLE };
