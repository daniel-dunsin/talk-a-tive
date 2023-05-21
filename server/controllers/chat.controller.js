const asyncHandler = require('express-async-handler');
const Chat = require('../models/chat.model');
const User = require('../models/user.model');
const Message = require('../models/message.model');
const { CustomError } = require('../utilities/errors');
const { StatusCodes } = require('http-status-codes');

module.exports.accessChat = asyncHandler(async (req, res, next) => {
  const { friendId } = req.body;

  // Check if the chat that contains both users has already been created
  const chatInDb = await Chat.findOne({
    $and: [{ users: req.userId }, { users: friendId }],
  }).populate('users', '-password');

  if (chatInDb) {
    return res.status(StatusCodes.OK).send({ chat: chatInDb });
  } else {
    const chat = await Chat.create({
      users: [req.userId, friendId],
    });

    const fullChat = await Chat.findById(chat?._id).populate(
      'users',
      '-password'
    );

    return res.status(StatusCodes.CREATED).send({ chat: fullChat });
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

  res.status(StatusCodes.OK).send({
    chats,
  });
});

module.exports.createGroup = asyncHandler(async (req, res, next) => {
  const users = req.body.users.map((user) => user._id);

  let group = await Chat.create({
    users: [...users, req.userId],
    name: req.body.name,
    isGroupChat: true,
    groupAdmin: req.userId,
  });

  group = await group.populate('users');

  res.status(StatusCodes.OK).send({ group });
});

module.exports.editGroup = asyncHandler(async (req, res, next) => {
  const users = req.body.users.map((user) => user._id);

  let group = await Chat.findById(req.params.id);

  if (group.groupAdmin.toString() !== req.userId.toString()) {
    return next(
      new CustomError(
        StatusCodes.BAD_REQUEST,
        'Only group admin can update group info'
      )
    );
  }

  group.users = [...users, req.userId];
  group.name = req.body.name;

  group = await group.save();

  res.status(StatusCodes.OK).send({ group });
});

module.exports.leaveGroup = asyncHandler(async (req, res, next) => {
  let group = await Chat.findById(req.params.id);

  group.users = group.users?.filter(
    (user) => user._id.toString() !== req.userId.toString()
  );

  group = await group.save();

  res.status(StatusCodes.OK).send({ group });
});
