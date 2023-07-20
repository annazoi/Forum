const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  creatorId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  creatorId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  date: {
    type: Date,
    default: Date.now,
  },

  comments: [commentSchema],
});

module.exports = mongoose.model("Post", postSchema);
