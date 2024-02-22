const userModel = require("../../models/User/UserModel");
const mongoose = require("mongoose");

const User = new userModel(
  {
    sid: "21201394",
    name: "gm_01",
    email: "zabir@gmail.com",
    password: "123",
    designation: "gm",
    department: "EM",
  }
  // {
  //   username: "exec_01",
  //   email: "zabir@gmail.com",
  //   password: "123",
  //   role: "exec",
  //   department: "None",
  //   status: false,
  // }
  // {
  //   username: "dir_01",
  //   email: "zabir@gmail.com",
  //   password: "123",
  //   role: "dir",
  //   department: "None",
  //   status: false,
  // }
  // {
  //   username: "admin_01",
  //   email: "zabir@gmail.com",
  //   password: "123",
  //   role: "admin",
  //   department: "None",
  //   status: false,
  // }
);

User.save();
