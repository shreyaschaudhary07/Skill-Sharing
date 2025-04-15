// models/User.js
const mongoose = require('mongoose');

// Create a schema for the user
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,  // Ensure username is unique
  },
  password: {
    type: String,
    required: true,
  },
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
