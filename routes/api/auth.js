const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { models } = require("mongoose");

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/auth/login
// @desc    Log in, authenticate user & get token
// @access  Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // Return jsonwebtoken (JWT)

      const token = await user.generateAuthToken();

      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   POST api/auth/logout
// @desc    Log out user
// @access  Private
router.post("/logout", auth, async (req, res) => {
  try {
  } catch (err) {}
});

// @route   GET api/auth/activate
// @desc    Activate user account
// @access  Private
router.put("/activate/:token", async (req, res) => {
  try {
    const data = jwt.verify(req.params.token, process.env.JWT_SECRET);
    await User.findByIdAndUpdate(
      { _id: data._id },
      { isAuthorized: true },
      function (err, result) {
        if (err) {
          res.json({ err });
        } else {
          res.json({ result });
        }
      }
    );
  } catch (err) {
    return res.json(err.message);
  }
});

module.exports = router;
