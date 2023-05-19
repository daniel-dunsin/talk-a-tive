const asyncHandler = require('express-async-handler');
const Chat = require('../models/chat.model');
const User = require('../models/user.model');
const Message = require('../models/message.model');
const { CustomError } = require('../utilities/errors');

module.exports.accessChat = asyncHandler(async (req, res, next) => {
  const { friendId } = req.body;

  // Check if the chat that contains both users has already been created
  const chatInDb = await Chat.findOne({
    $and: [{ users: req.userId }, { users: friendId }],
  }).populate('users', '-password');

  if (chatInDb) {
    return res.status(200).send({ chat: chatInDb });
  } else {
    const chat = await Chat.create({
      users: [req.userId, friendId],
    });

    const fullChat = await Chat.findById(chat?._id).populate(
      'users',
      '-password'
    );

    return res.status(200).send({ chat: fullChat });
  }
});

module.exports.getChats = asyncHandler(async (req, res, next) => {
  let chats = await Chat.find({ users: req.userId })
    .populate('users', '-password')
    .populate('latestMessage');

  chats = await User.populate(chats, {
    path: 'latestMessage.sender',
    select: '-password',
  });

  res.status(200).send({
    chats,
  });
});
