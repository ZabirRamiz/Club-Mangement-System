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
    type: Date, // or Date if you want to store time as a date object
    default: null, // or ''
  },
  deadline: {
    type: Date,
    default: null, // or ''
  },
  body: {
    type: String,
    default: null, // or ''
  },
  max_accepter: {
    type: Number,
    default: null, // or ''
  },
  accepted_by: {
    type: String,
    default: 0,
    min: 0, // Example: Minimum budget value of 0
  },
  work_status: {
    type: String,
    default: null, // or ''
  },
});

module.exports = mongoose.model("Work", WorkSchema);
