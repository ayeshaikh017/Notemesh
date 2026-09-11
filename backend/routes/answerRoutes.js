const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createAnswer,
  getAnswersForDoubt,
  toggleUpvote,
} = require("../controllers/answerController");

router.get("/doubt/:doubtId", getAnswersForDoubt);
router.post("/", auth, createAnswer);
router.post("/:id/upvote", auth, toggleUpvote);

module.exports = router;
