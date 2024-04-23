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
    default: null, // or ''
  },
  venue: {
    type: String,
    default: null, // or ''
  },
  guests: {
    type: String,
    default: null, // or ''
  },
  type: {
    type: String,
    default: null, // or ''
  },
  budget: {
    type: Number,
    default: 0,
    min: 0, // Example: Minimum budget value of 0
  },
  sponsor: {
    // Example of defining a specific schema for nested objects
    name: String,
    amount: Number,
    // Add more fields as needed
  },
  budget_status:{
    type: Boolean,
    default: false
  },
  pr: {
    type: String,
    default: null, // or ''
  },
});

module.exports = mongoose.model("Event", EventSchema);
