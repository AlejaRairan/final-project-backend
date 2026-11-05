const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateSignup, validateSignin } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');
const { MESSAGES } = require('../utils/constants');

router.post('/signup', validateSignup, createUser);
router.post('/signin', validateSignin, login);

router.use(auth);
router.use('/users', require('./users'));
router.use('/countries', require('./countries'));

router.use((req, res, next) => next(new NotFoundError(MESSAGES.RESOURCE_NOT_FOUND)));

module.exports = router;