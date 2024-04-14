const mongoose = require('mongoose')

const Schema = mongoose.Schema


const SponsorSchema = new Schema({
    name:{
        type: String,   
        required: true  
    },
    type:{
        type: String,
        required: true
    },
    more_info:{
        type: String,
        default: "None"
    },
    phone:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    sponsor_status:{
        type:String,
        required: true
    }
})   

// create model

module.exports = mongoose.model('Sponsor', SponsorSchema)   
 