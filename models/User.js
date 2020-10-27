const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  authors: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  id: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
