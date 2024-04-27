const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String, // or Date if you want to store time as a date object
    default: "", // or ''
  },
  venue: {
    type: String,
    default: "", // or ''
  },
  guests: {
    type: String,
    default: "", // or ''
  },
  type: {
    type: String,
    default: "", // or ''
  },
  pr: {
    type: String,
    default: "", // or ''
  },
});

module.exports = mongoose.model("Event", EventSchema);
