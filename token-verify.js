const jwt = require('jsonwebtoken');
//importamos el token
const {token, secret} = require('./token-sign');

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);

console.log(payload);
