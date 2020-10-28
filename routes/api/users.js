const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
var generator = require("generate-password");

const { check, validationResult } = require("express-validator");
const { sendWelcomeEmail } = require("../../emails/account");

const User = require("../../models/User");

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
    console.log(req.body);
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

      // Generate and encrypt password
      const salt = await bcrypt.genSalt(10);
      const password = generator.generate({
        length: 10,
        numbers: true,
      });
      user.password = await bcrypt.hash(password, salt);

      // Save user to database
      await user.save();

      // Return jsonwebtoken (JWT)

      const token = await user.generateAuthToken();
      res.send({ user, token });

      // Send confirmation email
      sendWelcomeEmail(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
