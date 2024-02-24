const userModel = require("../../models/Post/PostModel");
const mongoose = require("mongoose");

const getAllPosts = async (req, res) => {
  console.log("got all posts");
};

module.exports = { getAllPosts };
