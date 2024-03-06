const PostModel = require("../../models/Post/PostModel");
const postModel = require("../../models/Post/PostModel");
const mongoose = require("mongoose");

const getAllPosts = async (req, res) => {
  const posts = await postModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(posts);
};

const createPost = async (req, res) => {
  const { postUserId, body, upvote, downvote } = req.body;

  try {
    const newPost = await postModel.create({
      postUserId,
      body,
      upvote,
      downvote,
    });
    res.status(200).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;

  const post = await PostModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );
  if (!post) {
    return res.status(404).json({
      error: "No such POst",
    });
  }
  res.status(200).json(post);
};

module.exports = { getAllPosts, createPost, updatePost };
