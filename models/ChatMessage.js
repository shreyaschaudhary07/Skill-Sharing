const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;
