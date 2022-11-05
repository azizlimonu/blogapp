const express = require('express');
const router = express.Router();
const User = require("../model/User");
const Post = require("../model/Post")
const bcrypt = require("bcrypt");

// update user
router.put('/:id', async (req, res) => {
  // validate user id
  if (req.body.userId === req.params.id) {
    // validate password
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      )
      res.status(200).json(updatedUser)
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(401).json("only update your account")
  }
});

// delete user
router.delete("/:id", async (req, res) => {
  // validate userid
  if (req.body.userId === req.params.id) {
    // delete all the post of the user and user account
    try {
      // found the user
      const foundUser = await User.findById(req.params.id)
      try {
        // delete user post
        await Post.deleteMany({ username: foundUser.username })

        // delete user account
        res.status(200).json("User has been deleted...")

      } catch (error) {
        res.status(500).json(error)
      }
    } catch (error) {
      // if theres no user match
      res.status(404).json("User not found")
    }
  } else {
    res.status(401).json("You can delete only your account")
  }
});

// get user information
router.get('/:id', async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    const { password, ...other } = foundUser._doc;
    res.status(200).json(other)
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router;