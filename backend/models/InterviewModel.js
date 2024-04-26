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
    creatorSocket:{
        type:String,
        default: ""
    },
    remoteSocket:{
        type:String,
        default: ""
    },
    participants:{
        // type: [Number],
        // default: []    
        type: Number,
        default: 0  
    }
    
}, { timestamps: true })   



module.exports = mongoose.model('InterviewModel', InterviewSchema)    
