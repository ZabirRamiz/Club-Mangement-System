const mongoose = require("mongoose");
const schema = mongoose.Schema;

const PostSchema = new schema({
  postUserId:{
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true,
  },
  upvote: {
    type: Number,
    default: 0,
  },
  downvote:{
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Post", PostSchema);
