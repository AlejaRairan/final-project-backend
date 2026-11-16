const winston = require('winston');
const expressWinston = require('express-winston');

const requestFilter = (req, propName) => {
  if (propName === 'headers') {
    const { authorization, ...safeHeaders } = req.headers;
    return safeHeaders;
  }
  return req[propName];
};

module.exports.requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: 'request.log' })],
  format: winston.format.json(),
  requestFilter,
});

module.exports.errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: 'error.log' })],
  format: winston.format.json(),
  requestFilter,
});