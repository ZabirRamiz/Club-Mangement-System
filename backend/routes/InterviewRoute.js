const express = require("express");

const {
  getInterviewSessions,
  getSingleInterviewSession,
  updateInterviewSession,
  createInterviewSession,
  deleteInterviewSession
} = require("../controllers/InterviewController");

const router = express.Router();

// router.route("/getAllUser").get(getAllUser);

router.get("/getInterviewSessions", getInterviewSessions);
router.get("/getSingleInterviewSession/:board", getSingleInterviewSession);
router.post("/createInterviewSession", createInterviewSession)
router.patch("/updateInterviewSession/:board", updateInterviewSession);
router.delete("/deleteInterviewSession/:board", deleteInterviewSession)
module.exports = router;
