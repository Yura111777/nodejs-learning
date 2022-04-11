const AppError = require('./../utils/appError');

const handleHasErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidatorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid data ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token please login again', 401);

const handleJWTExpire = () =>
  new AppError('Token was expired. Please login again', 401);

const sentErrorDev = (err, req, res) => {
  //A) API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }
  //B) RENDER WEBSITE
  console.error('ERROR', err);
  return res.status(err.statusCode).render('error', {
    title: 'Uh oh! Something went wrong!',
    message: err.message
  });
};

const sentErrorProd = (err, req, res) => {
  //A) API
  if (req.originalUrl.startsWith('/api')) {
    // Operational send message to a client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    }
    // Programing or other unknown error send to a client
    // 1) log error
    console.error('ERROR', err);

    // 2) Sent generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }
  //B) RENDER WEBSITE
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Uh oh! Something went wrong!',
      status: err.status,
      message: err.message
    });
  }
  // Programing or other unknown error send to a client
  // 1) log error
  console.error('ERROR', err);

  // 2) Sent generic message
  return res.status(500).render('error', {
    status: 'error',
    message: 'Please try again later.'
  });
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sentErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    if (err.name === 'CastError') error = handleHasErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === 'ValidationError') error = handleValidatorDB(error);
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpire();
    sentErrorProd(error, req, res);
  }
};
