const userModel = require("../../models/User/UserModel");
const mongoose = require("mongoose");

const getAllUser = async (req, res) => {
  const allUser = await userModel.find({});

  res.status(200).json(allUser);
};

const getSpecificUser = async (req, res) => {
  const { specificUser } = req.params;

  const specific_user = await userModel.findOne({ username: specificUser });
  res.status(200).json(specific_user);
};
// const User = new userModel(
//   // {
//   //   username: "gm_01",
//   //   email: "zabir@gmail.com",
//   //   password: "123",
//   //   role: "gm",
//   //   department: "None",
//   //   status: false,
//   // }
//   // {
//   //   username: "exec_01",
//   //   email: "zabir@gmail.com",
//   //   password: "123",
//   //   role: "exec",
//   //   department: "None",
//   //   status: false,
//   // }
//   // {
//   //   username: "dir_01",
//   //   email: "zabir@gmail.com",
//   //   password: "123",
//   //   role: "dir",
//   //   department: "None",
//   //   status: false,
//   // }
//   // {
//   //   username: "admin_01",
//   //   email: "zabir@gmail.com",
//   //   password: "123",
//   //   role: "admin",
//   //   department: "None",
//   //   status: false,
//   // }
// );

// User.save();

module.exports = { getAllUser, getSpecificUser };
