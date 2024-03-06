const postModel = require("../../models/Post/PostModel");
const mongoose = require("mongoose");

const getAllPosts = async (req, res) => {
  const posts = await postModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(posts);
};

const createPost = async (req, res) => {
  const { postUserId, body, vote } = req.body;

  try {
    const newPost = await postModel.create({ postUserId, body, vote });
    res.status(200).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllPosts, createPost };
