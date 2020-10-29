const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaperSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Paper = mongoose.model("paper", PaperSchema);
