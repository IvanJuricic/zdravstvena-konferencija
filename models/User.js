const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

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
  papers: [
    {
      paper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "paper",
      },
    },
  ],
  isAuthorized: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, config.get("jwtSecret"));
  return token;
};

module.exports = User = mongoose.model("user", UserSchema);
