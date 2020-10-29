const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
var generator = require("generate-password");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");
const Paper = require("../../models/Paper");

// @route   PUT api/admin/role/:id
// @desc    Set user role
// @access  Private

router.put("/role/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.role = req.body.role;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
