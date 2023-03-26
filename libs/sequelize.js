const { Sequelize } = require('sequelize')

//le pasamos la conexión a la BD al ORM

const { config } = require('./../config/config');
const setupModels = require('./../db/models');

//No vamos variable por variable, las mandamos todas juntas en una URL
//Las variables más sensibles las protegemos

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const URI = `postgresql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
});

// importar los modelos
setupModels(sequelize);

//crear las tablas en la BD según el modelo
sequelize.sync();

module.exports = sequelize;
