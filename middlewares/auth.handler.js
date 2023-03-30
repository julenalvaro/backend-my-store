const boom = require('@hapi/boom');
const { config } = require('../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (!apiKey || apiKey !== config.apiKey) {
    next(boom.unauthorized('apiKey invalida'));
  } else {
    next();
  }
}

//fábrica de funciones de chequeo de roles

function checkRoles(roles) {
  return function (req, res, next) {
    user = req.user;
    if (!user || !roles.includes(user.role)) {
      next(boom.forbidden('No tienes permiso para realizar esta acción'));
    } else {
      next();
    }
  };
}

module.exports = { checkApiKey, checkRoles };
