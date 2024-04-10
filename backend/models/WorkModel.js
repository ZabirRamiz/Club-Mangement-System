const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkSchema = new Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true,
  },
  assign_date: {
    type: String, // or Date if you want to store time as a date object
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  category:{
    type: String,
    required: true
  },
  event: {
    type:String,
    default: "None"
  },
  accepted_by: {
    type: String,
    default: "",
  },
  work_status: {
    type: String,
    default: "Pending", // or ''
  }
});

module.exports = mongoose.model("Work", WorkSchema);
