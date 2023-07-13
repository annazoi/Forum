const Comment = require("../model/Comment");

const createComment = async (req, res) => {
  const comment = new Comment({
    description: req.body.description,
    commentId: req.userId,
  });
  try {
    const publishedComment = await comment.save();
    res.json(publishedComment);
  } catch (error) {
    res.json({ message: error });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.json({ message: err });
  }
};

const getComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.json(comment);
  } catch (err) {
    res.json({ message: err });
  }
};

const deleteComment = async (req, res) => {
  try {
    const removedComment = await Comment.deleteOne({ _id: req.params.id });

    res.json(removedComment);
  } catch (err) {
    res.json({ message: err });
  }
};

exports.createComment = createComment;
exports.getComments = getComments;
exports.getComment = getComment;
exports.deleteComment = deleteComment;
