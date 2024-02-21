const express = require("express");
const AllUserModel = require("../../models/User/UserModel");
const {
  getAllUser,
  getSpecificUser,
} = require("../../controllers/User/UserController");

const router = express.Router();

router.get("/getAllUser", getAllUser);
router.get("/specificUser/:specificUser", getSpecificUser);
module.exports = router;
