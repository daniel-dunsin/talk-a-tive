const router = require('express').Router();
const { login, register, getUsers } = require('../controllers/auth.controller');
const { uploader } = require('../utilities/upload.config');

router.post('/login', login);
router.post('/register', uploader.single('dp'), register);
router.get('/users', getUsers);

module.exports = router;
