// All Members

const { MongoGridFSChunkError } = require('mongodb')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MemberListSchema = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        sid:{
            type: Number,
            required: true
        },
        gsuite:{
            type: String,
            required: true
        },
        department:{
            type: String,
            required: true
        },
        designation:{
            type: String,
            required: true
        },
        joining_date:{
            type: Date,
            required: true
        },
        phone:{
            type: Number,   //start with 880
            required: true
        },
        last_promotion:{
            type: Date,
            required: false
        }
    }, {timestamps: false})

    module.exports = mongoose.model('MembersList', MemberListSchema)