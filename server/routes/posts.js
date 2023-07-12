const express = require("express");
const router = express.Router();
const middleWare = require("../middlewares/authMiddleware");
const postController = require("../controllers/posts");
const Post = require("../model/Post");

router.post("/", middleWare.protect, postController.createPost);
router.delete("/:id", postController.deletePost);
router.get("/", postController.getPosts);
router.get("/:id", postController.getPost);

module.exports = router;
