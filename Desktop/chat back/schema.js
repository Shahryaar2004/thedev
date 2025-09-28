const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  loggedin: {
    type: Boolean,
    default: null
  },
  profilePic: {
    type: String,
    default: "https://i.ibb.co/2kR0yXz/default-avatar.png"
  },
  bio: {
    type: String,
    default: "Hey there! I am using Zapzo"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  otp: {
    type: String,
    default: null
  },
  otpExpiry: {
    type: Date,
    default: null,
    index: { expires: 0 }
  },
   chats: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
      receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ]

});

const User = mongoose.model("User", userSchema);
module.exports = User;
