const mongoose = require("mongoose");
const schema = mongoose.Schema;

const allUserSchema = new schema(
  {
    username: {
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
    role: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);
module.exports = mongoose.model("AllUser", allUserSchema);
