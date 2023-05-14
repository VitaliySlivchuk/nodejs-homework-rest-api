const nameFieldError = (error) => {
  return error.details[0].path[0];
};

module.exports = nameFieldError;
