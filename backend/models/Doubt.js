const mongoose = require("mongoose");

const doubtSchema = new mongoose.Schema(
  {
    note: { type: mongoose.Schema.Types.ObjectId, ref: "Note", required: true },
    blockId: { type: String, required: true }, // which block this doubt is anchored to
    question: { type: String, required: true },
    askedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    resolved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

doubtSchema.index({ note: 1, blockId: 1 });

module.exports = mongoose.model("Doubt", doubtSchema);
