const { Pool } = require('pg');
const { config } = require('./../config/config');

//No vamos variable por variable, las mandamos todas juntas en una URL
//Las variables más sensibles las protegemos

let URI = '';

if (config.isProd) {
  URI = config.dbUrl;
}else{
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  URI = `postgresql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

const pool = new Pool({ connectionString: URI });

module.exports = pool;
