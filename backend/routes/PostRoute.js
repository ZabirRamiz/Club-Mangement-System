const express = require("express");
// const { getSpecificUser } = require("../../controllers/User/UserController");

const {
  getAllPosts,
  createPost,
  updatePost,
} = require("../controllers/PostController");

const router = express.Router();

router.get("/allPosts", getAllPosts);
router.post("/makePost", createPost);
// router.patch("/updatePost/:postUserId", updatePost)
router.patch("/updatePost/:id", updatePost);

module.exports = router;