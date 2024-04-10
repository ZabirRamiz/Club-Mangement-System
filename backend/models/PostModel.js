const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PostSchema = new Schema({
  postUserId: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  event:{
    type:String,
    default: "None"
  },
  event_id:{
    type: String,
    default: "None"
  },
  upvote: {
    type: [Number],
    default: []
  },
  downvote: {
    type: [Number],
    default: []
  },
});

module.exports = mongoose.model("Post", PostSchema);
