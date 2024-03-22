const express = require("express");
// const { getSpecificUser } = require("../../controllers/User/UserController");

const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost
} = require("../controllers/PostController");

const router = express.Router();

router.get("/allPosts", getAllPosts);
router.post("/makePost", createPost);
router.patch("/updatePost/:id", updatePost);
router.delete("/deletePost/:id", deletePost);

module.exports = router;