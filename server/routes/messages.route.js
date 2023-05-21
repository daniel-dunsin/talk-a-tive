const router = require('express').Router();
const {
  sendMessage,
  getAllMessages,
} = require('../controllers/message.controller');
const isAuth = require('../middlewares/isAuth');

router.route('/:chatId').post(isAuth, sendMessage).get(isAuth, getAllMessages);

module.exports = router;
