const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const FinanceSchema = new Schema({
    budget: {
        type: Number,
        default: 0,
        min: 0
    },
    pl: {
        type: Boolean,
        default: false
    },
    received:{
        type: Number,
        default: 0,
        min: 0
    },
    dateReceived:{
        type: Date,   
        default: ""
    },
    sponsor:{
        type:String,
        default: null
    },
    event:{
        type:String,
        default: null
    }

})




module.exports = mongoose.model("Finance", FinanceSchema);
