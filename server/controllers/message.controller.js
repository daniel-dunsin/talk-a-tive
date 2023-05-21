const asyncHandler = require('express-async-handler');
const Chat = require('../models/chat.model');
const User = require('../models/user.model');
const Message = require('../models/message.model');
const { CustomError } = require('../utilities/errors');
const { StatusCodes } = require('http-status-codes');

module.exports.sendMessage = asyncHandler(async (req, res, next) => {
  const { text } = req.body;
  const { chatId } = req.params;

  let message = await Message.create({
    chat: chatId,
    text,
    sender: req.userId,
  });

  message = await message.populate('sender', '-password');

  //   Update the latest message
  await Chat.findByIdAndUpdate(chatId, { latestMessage: message?._id });

  res.status(StatusCodes.OK).send({ message });
});

module.exports.getAllMessages = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({ chat: req.params.chatId })
    .sort('createdAt')
    .populate('sender', '-password');

  res.status(StatusCodes.OK).send({ messages });
});
