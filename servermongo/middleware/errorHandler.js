const createError = require("http-errors");

// not found handler
const notFoundHandler = (req, res, next) => {
  next(createError(404, "Content Not Found"));
};

// default error handler
const defaultErrorHandler = (err, req, res, next) => {
  res.sendStatus(err.sendStatus || 500);
  res.json({
    message: err.message
  });
};

module.exports = {
  notFoundHandler,
  defaultErrorHandler
};