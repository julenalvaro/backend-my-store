const { Client } = require('pg');

async function getConnection(){
  const client = new Client({
    user: 'jalvaro',
    host: 'localhost',
    database: 'my-store',
    password: '123456',
    port: 5432,
  });

  await client.connect();
  return client;
};

module.exports = getConnection;
