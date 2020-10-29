const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
var generator = require("generate-password");
const auth = require("../../middleware/auth");

const { check, validationResult } = require("express-validator");
const { sendWelcomeEmail } = require("../../emails/account");

const User = require("../../models/User");
const Paper = require("../../models/Paper");

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    //check("email", "Please include a valid email").isEmail(),
    //check("address", "Address is required").isEmpty(),
    //check("section", "Section is required").isEmpty(),
    //check("password", "Please enter a password with 6 or more characters").isLength( { min: 6} )
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, address, section } = req.body;

    try {
      // See if user already exists
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }

      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      // Create user instance; not saved to db
      user = new User({
        name,
        email,
        avatar,
        address,
        section,
      });

      // Generate and encrypt password and email token
      const salt = await bcrypt.genSalt(10);

      const password = generator.generate({
        length: 10,
        numbers: true,
      });
      //const emailToken = process.env.EMAIL_SECRET;
      //user.emailToken = await bcrypt.hash(emailToken, salt);
      user.password = await bcrypt.hash(password, salt);

      // Save user to database
      await user.save();

      // Return jsonwebtoken (JWT)

      const token = await user.generateAuthToken();
      res.send({ user, token, password });

      // Send confirmation email
      //sendWelcomeEmail(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/users
// @desc    Get user data
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// @route   PUT api/users/paper/:id
// @desc    Reference paper to user
// @access  Private
router.put("/paper/:id", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    let paper = await Paper.findById(req.params.id);
    user.papers = user.papers.concat({
      paper: paper.id,
      name: paper.name,
    });
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// @route   DELETE api/users/:id
// @desc    Delete user
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let user = await User.findByIdAndDelete(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
