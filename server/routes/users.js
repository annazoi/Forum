const express = require("express");
const router = express.Router();

const User = require("../model/User");

router.get("/", async (req, res) => {
  // find() -> Get all users
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
  s;
});

router.delete("/:id", async (req, res) => {
  try {
    const removedUser = await User.deleteOne({ _id: req.params.id });
    res.json(removedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
