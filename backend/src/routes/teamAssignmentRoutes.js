const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  assignEmployee,
  removeEmployee
} = require("../controllers/teamAssignmentController");

router.post("/assign", auth, assignEmployee);
router.post("/remove", auth, removeEmployee);

module.exports = router;
