const Doubt = require("../models/Doubt");
const Note = require("../models/Note");

exports.createDoubt = async (req, res) => {
  try {
    const { noteId, blockId, question } = req.body;
    if (!noteId || !blockId || !question) {
      return res.status(400).json({ message: "noteId, blockId and question are required" });
    }
    const note = await Note.findById(noteId);
    if (!note) return res.status(404).json({ message: "Note not found" });
    const validBlock = note.blocks.some((b) => b.blockId === blockId);
    if (!validBlock) return res.status(400).json({ message: "Invalid blockId for this note" });

    const doubt = await Doubt.create({
      note: noteId,
      blockId,
      question,
      askedBy: req.user.id,
    });
    res.status(201).json(doubt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// All doubts for a note, grouped implicitly by blockId (frontend groups them).
exports.getDoubtsForNote = async (req, res) => {
  try {
    const doubts = await Doubt.find({ note: req.params.noteId })
      .populate("askedBy", "name")
      .sort({ createdAt: -1 });
    res.json(doubts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.resolveDoubt = async (req, res) => {
  try {
    const doubt = await Doubt.findByIdAndUpdate(
      req.params.id,
      { resolved: true },
      { new: true }
    );
    if (!doubt) return res.status(404).json({ message: "Doubt not found" });
    res.json(doubt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
