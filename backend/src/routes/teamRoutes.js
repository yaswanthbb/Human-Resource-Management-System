const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createTeam,
  getTeams,
  updateTeam,
  deleteTeam
} = require("../controllers/teamController");

router.post("/", auth, createTeam);
router.get("/", auth, getTeams);
router.put("/:id", auth, updateTeam);
router.delete("/:id", auth, deleteTeam);

module.exports = router;
