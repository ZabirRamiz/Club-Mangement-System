// Schema file
// Can be compared to a table in sql
// Every table will have its seperate file ( good practice )

const mongoose = require('mongoose')

const Schema = mongoose.Schema

// create schema -> defines the structure of a particular document inside db
const demoSchema = new Schema({
    // defining properties
    title:{
        type: String,   // data type
        required: true  //mandatory or not
    },
    id:{
        type: Number,
        required: true
    },
    age:{
        type: Number,
        required: true
    }
    
}, { timestamps: true })   

// create model

module.exports = mongoose.model('DemoModelName', demoSchema)    
// params: name of model(should be singular, plurals are handled differently), schema variable