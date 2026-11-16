const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./middlewares/rateLimiter');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const { PORT, MONGO_URL, CORS_ORIGINS } = require('./utils/config');

const app = express();

mongoose.connect(MONGO_URL).catch((err) => {
  console.error('Could not connect to MongoDB:', err.message);
});

app.use(helmet());
app.use(cors({ origin: CORS_ORIGINS }));
app.use(express.json());

app.use(requestLogger);
app.use(limiter);
app.use(routes);

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});