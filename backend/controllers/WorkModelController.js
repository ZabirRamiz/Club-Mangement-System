const WorkModel = require('../models/WorkModel')
const mongoose = require('mongoose')

// get all works
const getWorks = async (req, res) =>{
    const works = await WorkModel.find({
        // blank means all works
    }).sort({createdAt: -1} )   //sorting in descending order of creation time

    res.status(200).json(works)
}

// get single work
const getSingleWork = async (req, res) =>{
    const { id } = req.params // id comes from '/:id'

    // if id format is invalid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error: "Invalid Id format"
        })
    }

    const work = await WorkModel.findById(id)

    if(!work){  // if invalid id or no work by that id
        return res.status(404).json({
            error: "No such work"
        })
    }
    res.status(200).json(work)
}


// create new work
const createWork = async (req, res) =>{
    const {from, to, assign_date, deadline, body, accepted_by, work_status } = req.body
    // add work to db
    try {
        const newWork = await WorkModel.create({from, to, assign_date, deadline, body, accepted_by, work_status})   //create new work with given params
        res.status(200).json(newWork)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a work
const deleteWork = async ( req, res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error: "Invalid Id format"
        })
    }
    const work = await WorkModel.findOneAndDelete({_id: id})
    // in mongodb, id is identified by _id name

    if(!work){  // if invalid id or no work by that id
        return res.status(404).json({
            error: "No such work"
        })
    }

    res.status(200).json(work)



}

// update a work
const updateWork = async(req, res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error: "Invalid Id format"
        })
    }
    const work = await WorkModel.findOneAndUpdate({_id: id}, {
        // update parameters
        ...req.body
        // the json we send, will be used to update the passed parameters
        // this can be used instead of hardcoding a json
    })

    if(!work){  
        return res.status(404).json({
            error: "No such work"
        })
    }
    res.status(200).json(work)
}


module.exports = {
    getWorks,
    getSingleWork,
    createWork,
    deleteWork,
    updateWork
}