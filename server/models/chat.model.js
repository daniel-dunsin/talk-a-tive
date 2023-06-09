const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: '',
      // Only group chats will have names
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: 'User',
        },
      ],
      required: true,
    },
    groupAdmin: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    latestMessage: {
      type: mongoose.Types.ObjectId,
      ref: 'Message',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Chat', ChatSchema);
