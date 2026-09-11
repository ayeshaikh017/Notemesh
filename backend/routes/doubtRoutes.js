const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createDoubt,
  getDoubtsForNote,
  resolveDoubt,
} = require("../controllers/doubtController");

router.get("/note/:noteId", getDoubtsForNote);
router.post("/", auth, createDoubt);
router.patch("/:id/resolve", auth, resolveDoubt);

module.exports = router;
