const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comments");
const middleWare = require("../middlewares/authMiddleware");
const Comment = require("../model/Comment");

router.post("/", middleWare.protect, commentController.createComment);
router.get("/", commentController.getComments);
router.get("/:id", commentController.getComment);
router.delete("/:id", commentController.deleteComment);

module.exports = router;
