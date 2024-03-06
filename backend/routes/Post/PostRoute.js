const express = require("express");
// const { getSpecificUser } = require("../../controllers/User/UserController");
const PostModel = require("../../models/Post/PostModel");
const {
  getAllPosts,
  createPost,
  updatePost,
} = require("../../controllers/Post/PostController");

const router = express.Router();

router.get("/allPosts", getAllPosts);
router.post("/makePost", createPost);
// router.patch("/updatePost/:postUserId", updatePost)
router.patch("/updatePost/:id", updatePost);

module.exports = router;
