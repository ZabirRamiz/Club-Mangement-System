const express = require("express");
const AllUserModel = require("../../models/User/UserModel");
const {
  getAllUser,
  getSpecificUser,
  editUser,
} = require("../../controllers/User/UserController");

const router = express.Router();

router.get("/getAllUser", getAllUser);
router.get("/specificUser/:studentId", getSpecificUser);
router.post("/editUser/:studentId", editUser);
module.exports = router;
