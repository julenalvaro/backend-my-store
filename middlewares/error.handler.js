function logErrors(err,req,res,next){
  console.log("logErrors")
  console.error(err);
  next(err);
}

function sequelizeErrorHandler(err, req, res, next) {
  if (err.name === 'SequelizeValidationError') {
    res.status(400).json({ message: err.message });
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(409).json({ message: 'Ya existe un registro con ese valor único' });
  } else {
    next(err);
  }
}


function boomErrorHandler(err,req,res,next){
  //si es boom, lo manejo
  console.log('boomErrorHandler')
  if(err.isBoom){
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {  //si no es boom, lo paso al siguiente middleware de tipo error
  next(err);
  }
}

function errorHandler(err,req,res,next){
  console.log("errorHandler")
  res.status(500);
  res.json({
    message: err.message,
    stack: err.stack,
  });
}


module.exports = { logErrors, sequelizeErrorHandler, boomErrorHandler, errorHandler };
