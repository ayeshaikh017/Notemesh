const Note = require("../models/Note");
const Doubt = require("../models/Doubt");

// Split raw text into blocks by blank line / paragraph, assigning stable ids.
function textToBlocks(rawContent) {
  const paragraphs = rawContent
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  return paragraphs.map((content, i) => ({ blockId: `b${i + 1}`, content }));
}

exports.createNote = async (req, res) => {
  try {
    const { title, subject, chapter, topic, content } = req.body;
    if (!title || !subject || !chapter || !topic || !content) {
      return res.status(400).json({ message: "title, subject, chapter, topic, content are required" });
    }
    const blocks = textToBlocks(content);
    const note = await Note.create({
      title,
      subject,
      chapter,
      topic,
      blocks,
      author: req.user.id,
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listNotes = async (req, res) => {
  try {
    const { subject, chapter, topic, q } = req.query;
    const filter = {};
    if (subject) filter.subject = subject;
    if (chapter) filter.chapter = chapter;
    if (topic) filter.topic = topic;
    if (q) filter.title = { $regex: q, $options: "i" };

    const notes = await Note.find(filter)
      .select("title subject chapter topic createdAt author")
      .populate("author", "name")
      .sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate("author", "name");
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Confusion heatmap: how many doubts were raised per block for this note.
exports.getHeatmap = async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await Note.findById(noteId);
    if (!note) return res.status(404).json({ message: "Note not found" });

    const counts = await Doubt.aggregate([
      { $match: { note: note._id } },
      { $group: { _id: "$blockId", count: { $sum: 1 } } },
    ]);

    const countMap = {};
    counts.forEach((c) => (countMap[c._id] = c.count));
    const maxCount = Math.max(1, ...Object.values(countMap));

    const heatmap = note.blocks.map((b) => ({
      blockId: b.blockId,
      doubtCount: countMap[b.blockId] || 0,
      intensity: Number(((countMap[b.blockId] || 0) / maxCount).toFixed(2)), // 0..1
    }));

    res.json({ noteId, maxCount, heatmap });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
