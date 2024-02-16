const DataModel = require('../models/MembersList')
const mongoose = require('mongoose')

// get all members
const getMembers = async (req, res) =>{
    const members = await DataModel.find({
        // blank means all Members
    }).sort({createdAt: -1} )   //sorting in descending order of creation time

    res.status(200).json(members)
}

// get single member
const getSingleMember = async (req, res) =>{
    const { id } = req.params // id comes from '/:id'

    // if id format is invalid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error: "Invalid Id format"
        })
    }

    const member = await DataModel.findById(id)

    if(!member){  // if invalid id or no member by that id
        return res.status(404).json({
            error: "No such member"
        })
    }
    res.status(200).json(member)
}


// create new member
const createMember = async (req, res) =>{
    const { name, password, sid, gsuite, department, designation, joining_date, phone, last_promotion } = req.body
    // add member to db
    try {
        const newMember = await DataModel.create({name, password, sid, gsuite, department, designation, joining_date, phone, last_promotion})   //create new member with given params
        res.status(200).json(newMember)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a member
const deleteMember = async ( req, res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error: "Invalid Id format"
        })
    }
    const member = await DataModel.findOneAndDelete({_id: id})
    // in mongodb, id is identified by _id name

    if(!member){  // if invalid id or no member by that id
        return res.status(404).json({
            error: "No such member"
        })
    }

    res.status(200).json(member)



}

// update a member
const updateMember = async(req, res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error: "Invalid Id format"
        })
    }
    const member = await DataModel.findOneAndUpdate({_id: id}, {
        // update parameters
        ...req.body
        // the json we send, will be used to update the passed parameters
        // this can be used instead of hardcoding a json
    })

    if(!member){
        return res.status(404).json({
            error: "No such member"
        })
    }
    res.status(200).json(member)
}


module.exports = {
    getMembers,
    getSingleMember,
    createMember,
    deleteMember,
    updateMember
}
