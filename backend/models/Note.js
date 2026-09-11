const mongoose = require("mongoose");

// Each note is broken into discrete blocks (paragraphs) so doubts can be
// anchored to a stable blockId instead of a fragile character offset.
const blockSchema = new mongoose.Schema({
  blockId: { type: String, required: true }, // e.g. "b1", "b2"
  content: { type: String, required: true },
});

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    chapter: { type: String, required: true },
    topic: { type: String, required: true },
    blocks: [blockSchema],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

noteSchema.index({ subject: 1, chapter: 1, topic: 1 });

module.exports = mongoose.model("Note", noteSchema);
