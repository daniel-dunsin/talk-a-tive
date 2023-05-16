const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    chat: {
      type: mongoose.Types.ObjectId,
      ref: 'Chat',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', MessageSchema);
