const InterviewModel = require('../models/InterviewModel')
const mongoose = require('mongoose')

// get all interviewSession
const getInterviewSessions = async (req, res) =>{
    const interviewSession = await InterviewModel.find({
        // blank means all interviewSessions
    }).sort({createdAt: -1} )   //sorting in descending order of creation time

    res.status(200).json(interviewSession)
}

// get single member
const getSingleInterviewSession = async (req, res) =>{
    const { board } = req.params // id comes from '/:id'


    const interviewSession = await InterviewModel.findOne({board: board})

    if(!interviewSession){  // if invalid id or no interviewSession by that id
        return res.status(404).json({
            error: "No such interviewSession"
        })
    }
    res.status(200).json(interviewSession)
}


// create new member
const createInterviewSession = async (req, res) =>{
    const { board, creator, participants } = req.body
    // add member to db
    try {
        const newInterviewSession = await InterviewModel.create({board, creator, participants})   //create new member with given params
        res.status(200).json(newInterviewSession)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a member
const deleteInterviewSession = async ( req, res) =>{
    const { board } = req.params


    const interviewSession = await InterviewModel.findOneAndDelete({board: board})
    // in mongodb, id is identified by _id name

    if(!interviewSession){  // if invalid id or no interviewSession by that id
        return res.status(404).json({
            error: "No such interviewSession"
        })
    }

    res.status(200).json(interviewSession)



}

// update a member
const updateInterviewSession = async(req, res) =>{
    const { board } = req.params


    const interviewSession = await InterviewModel.findOneAndUpdate({board : board}, {
        // update parameters
        ...req.body
        // the json we send, will be used to update the passed parameters
        // this can be used instead of hardcoding a json
    })

    if(!interviewSession){
        return res.status(404).json({
            error: "No such interviewSession"
        })
    }
    res.status(200).json(interviewSession)
}


module.exports = {
    getInterviewSessions,
    getSingleInterviewSession,
    createInterviewSession,
    deleteInterviewSession,
    updateInterviewSession
}
