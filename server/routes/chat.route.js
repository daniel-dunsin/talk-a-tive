const router = require('express').Router();
const {
  accessChat,
  getChats,
  createGroup,
  editGroup,
  leaveGroup,
} = require('../controllers/chat.controller');
const isAuth = require('../middlewares/isAuth');

router.get('/', isAuth, getChats);
router.post('/access-chat', isAuth, accessChat);
router.post('/group', isAuth, createGroup);
router.route('/group/:id').patch(isAuth, leaveGroup).put(isAuth, editGroup);

module.exports = router;
