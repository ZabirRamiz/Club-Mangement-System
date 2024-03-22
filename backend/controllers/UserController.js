const userModel = require("../models/UserModel");
const mongoose = require("mongoose");

const getAllUser = async (req, res) => {
  const allUser = await userModel.find({});

  res.status(200).json(allUser);
};

const getSpecificUser = async (req, res) => {
  const { studentId } = req.params;

  const specific_user = await userModel.findOne({ sid: studentId });

  res.status(200).json(specific_user);
};

// const editUser = async (req, res) => {
//   const { studentId } = req.params;
//   const { email, password } = req.body;
//   const filter = { sid: studentId };
//   const updateDoc = {
//     $set: {
//       email: email,
//       password: password,
//     },
//   };
//   try {
//     const edit_user = await userModel.findOneAndUpdate(filter, updateDoc, {
//       new: true,
//     });
//     res
//       .status(200)
//       .json({ message: "Update successful", user: edit_user, form: req.body });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "An error occurred during the update" });
//   }
// };

const editUser = async(req, res) =>{
  const { studentId } = req.params
  console.log(` member ${studentId}`)
  const member = await userModel.findOneAndUpdate({sid: studentId},{
    ...req.body
  })
  
  if(!member){
    console.log(`No such member ${studentId}`)
    return res.status(404).json({
      error: `No such member ${studentId}`
      
    })
  }

  res.status(200).json(member)

}

const createUser = async (req, res) =>{
  const {studentID, name, email, password, designation, department, profileImage } = req.body
  // add document to db
  try {
      const newUser = await userModel.create({
        sid: studentID,
        name: name,
        email: email,
        password: password,
        designation: designation,
        department: department
      })   //create new document with given params
      res.status(200).json(newUser)
  } catch (error) {
      res.status(400).json({error: error.message})
  }
}

const deleteUser = async ( req, res) =>{
  const { studentId } = req.params

  const user = await userModel.findOneAndDelete({sid: studentId})

  if(!user){
      return res.status(404).json({
          error: "No such user"
      })
  }

  res.status(200).json(user)

}





// const User = new userModel(
//   // {
//   //   sid: "21201397",
//   //   name: "admin_01",
//   //   email: "zabir@gmail.com",
//   //   password: "123",
//   //   designation: "admin",
//   //   department: "All",
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

module.exports = { getAllUser, getSpecificUser, editUser, createUser, deleteUser };
