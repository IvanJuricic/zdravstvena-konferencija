const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Paper = require("../../models/Paper");
const User = require("../../models/User");

// @route   POST api/papers
// @desc    Post a paper
// @access  Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user._id).select("-password");

      const newPaper = new Paper({
        text: req.body.text,
        name: req.body.name,
      });

      const paper = await newPaper.save();

      user.papers = user.papers.concat({ paper: paper._id, name: paper.name });
      await user.save();

      res.send({ paper, user });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/papers
// @desc    Get all papers
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const papers = await Paper.find();
    res.json(papers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/papers/:id
// @desc    Get paper by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id);

    if (!paper) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(paper);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   POST api/papers/comm/:id
// @desc    Add comment to paper
// @access  Private
router.post("/comm/:id", auth, async (req, res) => {
  try {
    let paper = await Paper.findById(req.params.id);
    let user = await User.findById(req.user._id);
    const comment = {
      user,
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
    };
    paper.comments = paper.comments.concat(comment);
    await paper.save();
    return res.status(200).json(paper);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// @route   DELETE api/papers/comm/:id
// @desc    Delete comment on paper
// @access  Private
router.delete("/comm/:paperId/:commId", auth, async (req, res) => {
  try {
    let paper = await Paper.findById(req.params.paperId);
    //paper.find({ "comments._id": req.params.commId });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// @route   DELETE api/papers/:id
// @desc    Delete a paper
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const paper = await Paper.findByIdAndDelete(req.params.id);
    if (!paper) {
      return res.status(404).json({ msg: "Paper not found" });
    }

    res.json({ msg: "Paper removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
