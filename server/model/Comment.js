const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  commentId: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
