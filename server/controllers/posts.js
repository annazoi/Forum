const Post = require("../model/Post");
const cloudinary = require("../utils/cloudinary");

const createPost = async (req, res) => {
  // const post = new Post({
  //   title: req.body.title,
  //   description: req.body.description,
  //   creatorId: req.userId,
  // });
  const { title, description, image } = req.body;
  console.log(req.body);
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "posts",
      width: 300,
      crop: "scale",
    });
    console.log(result.url);
    const post = await Post.create({
      title,
      description,
      creatorId: req.userId,
      image: result.url,
    });

    res.status(201).json({
      success: true,
      post,
    });

    // const savedPost = await post.save();
    // res.json(savedPost);
  } catch (error) {
    res.json({ message: error });
  }
};

const deletePost = async (req, res) => {
  try {
    const removedPost = await Post.deleteOne({
      _id: req.params.id,
      creatorId: req.userId,
    });

    res.json(removedPost);
  } catch (err) {
    res.status(404).send({ message: "post not found" });
  }
};

const getPosts = async (req, res) => {
  try {
    let filter = {};
    const creatorId = req.query.creatorId;
    if (creatorId) {
      filter = { creatorId: creatorId };
    }
    const posts = await Post.find(filter).populate(
      "creatorId comments.creatorId",
      "-password"
    );

    if (!posts || posts.length === 0) {
      return res
        .status(404)
        .json({ message: "Not found Posts yet", posts: null });
    }
    res.status(201).json({ message: "ok", posts: posts });
  } catch (err) {
    res.status(404).json({ message: "Not found posts yet", posts: null });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "creatorId comments.creatorId",
      "-password"
    );

    if (!post) {
      return res.status(404).json({ message: "Post not Found", post: null });
    }

    res.status(201).json({ message: "ok", post: post });
  } catch (err) {
    return res.status(404).json({ message: "Post not Found", post: null });
  }
};
exports.createPost = createPost;
exports.deletePost = deletePost;
exports.getPosts = getPosts;
exports.getPost = getPost;
