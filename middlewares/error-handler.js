const { isCelebrateError } = require('celebrate');

module.exports = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    return res.status(400).send({ message: 'Invalid data' });
  }

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).send({ message: 'Invalid data' });
  }

  if (err.code === 11000) {
    return res.status(409).send({ message: 'Already exists' });
  }

  const { statusCode = 500, message } = err;

  return res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  });
};