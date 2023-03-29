const jwt = require('jsonwebtoken');

const secret = 'mysecretkeyshhhhhhhhh'

const payload = {
  user: 'Julen',
  role: 'admin'
}

function signToken(payload, secret, expiresIn = '1h') {
  return jwt.sign(payload, secret, { expiresIn: expiresIn });
}

const token = signToken(payload, secret);

// console.log(token);

//exportamos el token
module.exports = {token, secret, signToken};
