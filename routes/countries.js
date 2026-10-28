const router = require('express').Router();
const { getCountries, createCountry, deleteCountry } = require('../controllers/countries');
const { validateCountry, validateCountryId } = require('../middlewares/validation');

router.get('/', getCountries);
router.post('/', validateCountry, createCountry);
router.delete('/:countryId', validateCountryId, deleteCountry);

module.exports = router;