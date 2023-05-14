const handleMongooseError = (err, data, next) => {
  err.staus = 400;
  next();
};

module.exports = handleMongooseError;
