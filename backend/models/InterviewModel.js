const mongoose = require('mongoose')

const Schema = mongoose.Schema


const InterviewSchema = new Schema({
    // defining properties
    board:{
        type: Number,   // data type
        required: true  //mandatory or not
    },
    creator:{
        type: Number,
        required: true
    },
    participants:{
        type: [Number],
        default: []      
    }
    
}, { timestamps: true })   



module.exports = mongoose.model('InterviewModel', InterviewSchema)    
