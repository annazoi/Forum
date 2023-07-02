const express = require("express");
const router = express.Router();

const User = require("../model/User");

router.get("/", (req, res) => {
  res.send("Register Page");
});

router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    surname: req.body.surname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
