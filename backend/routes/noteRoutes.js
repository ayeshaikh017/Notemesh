const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createNote,
  listNotes,
  getNote,
  getHeatmap,
} = require("../controllers/noteController");

router.get("/", listNotes);
router.get("/:id", getNote);
router.get("/:id/heatmap", getHeatmap);
router.post("/", auth, createNote);

module.exports = router;
