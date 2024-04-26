const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema(
  {
    sid: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    department: {
      type: String,
    },
    image: {
      data: Buffer, // Store image data as buffer
      contentType: String // Store content type of the image
    }
  },
  { timestamps: false }
);
module.exports = mongoose.model("User", UserSchema);
