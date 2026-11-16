const mongoose = require('mongoose');
const validator = require('validator');

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  capital: { type: String, required: true },
  region: { type: String, required: true },
  flag: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value, { require_protocol: true }),
      message: 'Invalid URL',
    },
  },
  landscape: { type: String },
  description: { type: String },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

countrySchema.index({ owner: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('country', countrySchema);