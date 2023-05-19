const router = require('express').Router();
const { login, register, getUsers } = require('../controllers/auth.controller');
const isAuth = require('../middlewares/isAuth');
const { uploader } = require('../utilities/upload.config');

router.post('/login', login);
router.post('/register', uploader.single('dp'), register);
router.get('/users', isAuth, getUsers);

module.exports = router;
