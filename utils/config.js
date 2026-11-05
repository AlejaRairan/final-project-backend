require('dotenv').config({ quiet: true });

const {
  NODE_ENV, JWT_SECRET, PORT, MONGO_URL, CORS_ORIGIN,
} = process.env;

const isProduction = NODE_ENV === 'production';

if (isProduction && !JWT_SECRET) {
  throw new Error('JWT_SECRET must be set when NODE_ENV=production');
}

module.exports = {
  PORT: Number(PORT) || 3000,
  MONGO_URL: MONGO_URL || 'mongodb://127.0.0.1:27017/countriesdb',
  JWT_SECRET: isProduction ? JWT_SECRET : 'dev-secret-not-for-production',
  CORS_ORIGINS: CORS_ORIGIN
    ? CORS_ORIGIN.split(',').map((origin) => origin.trim())
    : ['http://localhost:5173'],
};