const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateSignup, validateSignin } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', validateSignup, createUser);
router.post('/signin', validateSignin, login);

router.use(auth);
router.use('/users', require('./users'));
router.use('/countries', require('./countries'));

router.use((req, res, next) => next(new NotFoundError('Resource not found')));

module.exports = router;