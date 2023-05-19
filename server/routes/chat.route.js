const router = require('express').Router();
const { accessChat } = require('../controllers/chat.controller');

router.post('/access-chat', accessChat);

module.exports = router;
