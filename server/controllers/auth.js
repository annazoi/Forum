const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const cloudinary = require("../utils/cloudinary");

const register = async (req, res, next) => {
  const { name, surname, username, email, password, confirmPassword, image } =
    req.body;
  console.log(req.body);

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

  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "users",
      // width: 300,
      // height: 200,
      // format: "jpg",
      // crop: "scale",
    });
    console.log(result.url);
    // const createdUser = new User({
    //   name,
    //   surname,
    //   username,
    //   email,
    //   password: hashedPassword,
    //   image: result.url,
    // });
    // res.json({ success: true, createdUser });

    const createdUser = await User.create({
      name,
      surname,
      username,
      email,
      password: hashedPassword,
      image: result.url,
    });
    res.status(201).json({
      success: true,
      createdUser,
    });

    // await createdUser.save();
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

const getUsers = async (req, res) => {
  // find() -> Get all users
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
};

const deleteUser = async (req, res) => {
  try {
    const removedUser = await User.deleteOne({ _id: req.params.id });
    res.json(removedUser);
  } catch (err) {
    res.json({ message: err });
  }
};

exports.register = register;
exports.login = login;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.deleteUser = deleteUser;
