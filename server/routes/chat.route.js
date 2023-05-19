const router = require('express').Router();
const { accessChat, getChats } = require('../controllers/chat.controller');
const isAuth = require('../middlewares/isAuth');

router.get('/', isAuth, getChats);
router.post('/access-chat', isAuth, accessChat);

module.exports = router;
