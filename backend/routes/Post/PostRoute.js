const express = require("express");
// const { getSpecificUser } = require("../../controllers/User/UserController");
const PostModel = require("../../models/Post/PostModel")
const { getAllPosts, createPost } = require("../../controllers/Post/PostController");

const router = express.Router();

router.get("/allPosts", getAllPosts)
router.post("/makePost", createPost)

module.exports = router;
