const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    doubt: { type: mongoose.Schema.Types.ObjectId, ref: "Doubt", required: true },
    text: { type: String, required: true },
    answeredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Answer", answerSchema);
