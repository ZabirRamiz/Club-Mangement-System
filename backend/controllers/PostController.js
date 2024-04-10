const PostModel = require("../models/PostModel");
const mongoose = require("mongoose");

const getAllPosts = async (req, res) => {
  const posts = await PostModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(posts);
};

const createPost = async (req, res) => {
  const { postUserId, body, type, event, event_id } = req.body;

  try {
    const newPost = await PostModel.create({
      postUserId,
      body,
      type,
      event,
      event_id
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

const deletePost = async ( req, res) =>{
  const { id } = req.params

  const post = await PostModel.findOneAndDelete({_id: id})

  if(!post){
      return res.status(404).json({
          error: "No such post"
      })
  }

  res.status(200).json(post)

}

module.exports = { getAllPosts, createPost, updatePost, deletePost };