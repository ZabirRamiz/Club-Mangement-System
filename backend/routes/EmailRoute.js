const express = require("express");

const { send, sendAll } = require("../controllers/EmailController");

const router = express.Router();

// router.post("/sendEmail", sendEmail);
router.post("/sendEmail", send); // {send_to, subject, message}
router.post("/sendAllEmail", sendAll)
module.exports = router;
 