const FinanceModel = require('../models/FinanceModel')
const mongoose = require('mongoose')



// get all finances
const getFinances = async (req, res) =>{
    const finances = await FinanceModel.find({
        // blank means all finances
    }).sort({createdAt: -1} )   //sorting in descending order of creation time

    res.status(200).json(finances)
}

// get single finance
const getSingleFinance = async (req, res) =>{
    const { id } = req.params // id comes from '/:id'

    // if id format is invalid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error: "Invalid Id format"
        })
    }

    const finance = await FinanceModel.findById(id)

    if(!finance){  // if invalid id or no finance by that id
        return res.status(404).json({
            error: "No such finance"
        })
    }
    res.status(200).json(finance)
}


// create new finance
const createFinance = async (req, res) =>{
    const {budget, pl, received, dateReceived, sponsor, event } = req.body
    // add finance to db
    try {
        const newFinance = await FinanceModel.create({budget, pl, received, dateReceived, sponsor, event})   //create new finance with given params
        res.status(200).json(newFinance)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a finance
const deleteFinance = async ( req, res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error: "Invalid Id format"
        })
    }
    const finance = await FinanceModel.findOneAndDelete({_id: id})
    // in mongodb, id is identified by _id name

    if(!finance){  // if invalid id or no finance by that id
        return res.status(404).json({
            error: "No such finance"
        })
    }

    res.status(200).json(finance)



}

// update a finance
const updateFinance = async(req, res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error: "Invalid Id format"
        })
    }
    const finance = await FinanceModel.findOneAndUpdate({_id: id}, {
        // update parameters
        ...req.body
        // the json we send, will be used to update the passed parameters
        // this can be used instead of hardcoding a json
    })

    if(!finance){  
        return res.status(404).json({
            error: "No such finance"
        })
    }
    res.status(200).json(finance)
}


module.exports = {
    getFinances,
    getSingleFinance,
    createFinance,
    deleteFinance,
    updateFinance
}