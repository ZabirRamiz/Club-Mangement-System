const express = require("express");
const AllUserModel = require("../../models/User/UserModel");
const {
  getAllUser,
  getSpecificUser,
  editUser,
  createUser,
  deleteUser
} = require("../../controllers/User/UserController");

const router = express.Router();

// router.route("/getAllUser").get(getAllUser);

router.get("/getAllUser", getAllUser);
router.get("/getSpecificUser/:studentId", getSpecificUser);
router.post("/createUser", createUser)
router.patch("/editUser/:studentId", editUser);
router.delete("/deleteUser/:studentId", deleteUser)
module.exports = router;
