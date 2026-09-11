const Answer = require("../models/Answer");
const Doubt = require("../models/Doubt");

exports.createAnswer = async (req, res) => {
  try {
    const { doubtId, text } = req.body;
    if (!doubtId || !text) {
      return res.status(400).json({ message: "doubtId and text are required" });
    }
    const doubt = await Doubt.findById(doubtId);
    if (!doubt) return res.status(404).json({ message: "Doubt not found" });

    const answer = await Answer.create({
      doubt: doubtId,
      text,
      answeredBy: req.user.id,
    });
    res.status(201).json(answer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Answers for a doubt, best (most upvoted) first.
exports.getAnswersForDoubt = async (req, res) => {
  try {
    const answers = await Answer.find({ doubt: req.params.doubtId })
      .populate("answeredBy", "name")
      .lean();
    answers.sort((a, b) => b.upvotes.length - a.upvotes.length);
    res.json(answers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.toggleUpvote = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ message: "Answer not found" });

    const userId = req.user.id;
    const idx = answer.upvotes.findIndex((u) => u.toString() === userId);
    if (idx === -1) {
      answer.upvotes.push(userId);
    } else {
      answer.upvotes.splice(idx, 1);
    }
    await answer.save();
    res.json({ upvoteCount: answer.upvotes.length, upvoted: idx === -1 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
