const express = require("express");
const router = express.Router();

const Post = require("../model/Post");

// Page with all posts
// router.get("/", (req, res) => {
//   res.send("inside all posts");
// });

// http://localhost:3000/posts/specific
router.get("/specific", (req, res) => {
  res.send("inside the specific post");
});

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

// Save a post
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

  //   post
  //     .save()
  //     .then((data) => {
  //       res.json(data);
  //     })
  //     .catch((err) => {
  //       res.json({ message: err });
  //     });
});

// Get a specific post
router.get("/:postID", async (req, res) => {
  // res.send(req.params.postID);
  try {
    const post = await Post.findById(req.params.postID);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update the specific post
router.patch("/:postID", async (req, res) => {
  try {
    const updatesPost = await Post.updateOne(
      { _id: req.params.postID },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
        },
      }
    );
    res.json(updatesPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete a post
router.delete("/:postID", async (req, res) => {
  try {
    const removePost = await Post.deleteOne({ _id: req.params.postID });

    res.json(removePost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
