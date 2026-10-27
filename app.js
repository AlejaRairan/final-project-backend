const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');
const { PORT, MONGO_URL, CORS_ORIGINS } = require('./utils/config');

const app = express();

mongoose.connect(MONGO_URL);

app.use(helmet());
app.use(cors({ origin: CORS_ORIGINS }));
app.use(express.json());

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});