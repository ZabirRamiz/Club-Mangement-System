const express = require("express");

const { send } = require("../controllers/EmailController");

const router = express.Router();

// router.post("/sendEmail", sendEmail);
router.post("/sendEmail", send);

module.exports = router;
