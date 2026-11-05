const { isCelebrateError } = require('celebrate');
const { MESSAGES } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    return res.status(400).send({ message: MESSAGES.INVALID_DATA });
  }

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).send({ message: MESSAGES.INVALID_DATA });
  }

  if (err.code === 11000) {
    return res.status(409).send({ message: MESSAGES.EMAIL_TAKEN });
  }

  const { statusCode = 500, message } = err;

  return res.status(statusCode).send({
    message: statusCode === 500 ? MESSAGES.SERVER_ERROR : message,
  });
};