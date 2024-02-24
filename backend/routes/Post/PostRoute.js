const express = require("express");
// const { getSpecificUser } = require("../../controllers/User/UserController");
// const AllUserModel = require("../../models/Post/PostModel");
const { getAllPosts } = require("../../controllers/Post/PostController");

const router = express.Router();

router.route("/").get(getAllPosts);
// router.route("/:specificPost").get(getSpecificPost);

module.exports = router;
