const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Post = require("../model/Post");

const register = async (req, res, next) => {
  const { name, surname, username, email, password, confirmPassword } =
    req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({
      $or: [
        {
          email: email,
        },
        // { phone: phone },
      ],
    });
  } catch (err) {
    return res
      .status(400)
      .send({ message: "Signing up failed, please try again later. 1" });
  }

  if (password !== confirmPassword) {
    return res.status(400).send({ message: "Passwords do not match" });
  }

  if (existingUser) {
    return res.status(400).send({ message: "User already exits" });
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    console.log(err);

    return res.status(400).send({ message: "Could not create user" });
  }

  const createdUser = new User({
    name,
    surname,
    username,
    email,
    password: hashedPassword,
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "Could not create user" });
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
  } catch (err) {
    return res
      .status(400)
      .send({ message: "Signing up failed, please try again later" });
  }

  res.status(201).json({ userId: createdUser.id, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({
      $or: [
        {
          email: email,
        },
        //   { phone: email },
      ],
    });
  } catch (err) {
    return res
      .status(400)
      .send({ message: "Logging in failed, please try again later." });
  }

  if (!existingUser) {
    return res
      .status(400)
      .send({ message: "Invalid credentials, could not log you in." });
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return res
      .status(400)
      .send({ message: "Invalid credentials, could not log you in." });
  }

  if (!isValidPassword) {
    return res
      .status(400)
      .send({ message: "Invalid credentials, could not log you in." });
  }

  let token;
  try {
    token = jwt.sign({ userId: existingUser.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
  } catch (err) {
    return res
      .status(400)
      .send({ message: "Logging in failed, please try again later.2" });
  }

  res.status(200).json({
    userId: existingUser.id,
    token: token,
  });
};

const post = async (req, res) => {
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
};

// const removePost = async (req, res) => {
//   try {
//     const removePost = await Post.deleteOne({ _id: req.params.postID });

//     res.json(removePost);
//   } catch (err) {
//     res.json({ message: err });
//   }
// };

// const updatedPost = async (req, res) => {
//   try {
//     const updatedPost = await Post.updateOne(
//       { _id: req.params.postID },
//       {
//         $set: {
//           title: req.body.title,
//           description: req.body.description,
//         },
//       }
//     );
//     res.json(updatedPost);
//   } catch (err) {
//     res.json({ message: err });
//   }
// };

exports.register = register;
exports.login = login;
exports.post = post;
