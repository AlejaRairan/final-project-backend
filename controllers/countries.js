const Country = require('../models/country');
const ConflictError = require('../errors/ConflictError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getCountries = (req, res, next) => {
  Country.find({ owner: req.user._id })
    .then((countries) => res.send(countries))
    .catch(next);
};

module.exports.createCountry = (req, res, next) => {
  const {
    name, capital, region, flag, landscape, description,
  } = req.body;

  Country.create({
    name, capital, region, flag, landscape, description, owner: req.user._id,
  })
    .then((country) => {
      const { owner, ...data } = country.toObject();
      res.status(201).send(data);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Country already saved'));
      }
      return next(err);
    });
};

module.exports.deleteCountry = (req, res, next) => {
  Country.findById(req.params.countryId).select('+owner')
    .then((country) => {
      if (!country) {
        throw new NotFoundError('Country not found');
      }
      if (country.owner.toString() !== req.user._id) {
        throw new ForbiddenError('You cannot delete another user\'s country');
      }
      return country.deleteOne().then(() => res.send(country));
    })
    .catch(next);
};