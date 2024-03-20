const express = require("express");

const {
  getAllUser,
  getSpecificUser,
  editUser,
  createUser,
  deleteUser
} = require("../controllers/UserController");

const router = express.Router();

// router.route("/getAllUser").get(getAllUser);

router.get("/getAllUser", getAllUser);
router.get("/getSpecificUser/:studentId", getSpecificUser);
router.post("/createUser", createUser)
router.patch("/editUser/:studentId", editUser);
router.delete("/deleteUser/:studentId", deleteUser)
module.exports = router;
