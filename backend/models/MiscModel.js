const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const MiscSchema = new Schema({
    registration: {
        type: Boolean,
        default: false
    },
    interview: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model("Misc", MiscSchema);
