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
    },
    sponsor:{
        type:String
    },
    event:{
        type:String,
    }

})




module.exports = mongoose.model("Finance", FinanceSchema);
