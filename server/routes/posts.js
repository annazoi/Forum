const express = require("express");
const router = express.Router();

const Post = require("../model/Post");

// const createController = require("../controllers/posts");
// const removeController = require("../controllers/posts");
// const updateController = require("../controllers/posts");

// Save / Delete / Update a post
// router.post("/", createController.post);
// router.delete("/:id", removeController.post);
// router.patch("/:id", updateController.post);

// Get all posts
router.get("/", async (req, res) => {
  // find() -> Get all posts
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get a specific post
router.get("/:id", async (req, res) => {
  // res.send(req.params.postID);
  try {
    const post = await Post.findById(req.params.postID);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
