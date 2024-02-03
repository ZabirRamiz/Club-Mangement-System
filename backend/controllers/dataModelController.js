const DataModel = require('../models/dataModel')
const mongoose = require('mongoose')

// get all documents
const getDocuments = async (req, res) =>{
    const documents = await DataModel.find({
        // blank means all documents
    }).sort({createdAt: -1} )   //sorting in descending order of creation time

    res.status(200).json(documents)
}

// get single document
const getSingleDocument = async (req, res) =>{
    const { id } = req.params // id comes from '/:id'

    // if id format is invalid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error: "Invalid Id format"
        })
    }

    const document = await DataModel.findById(id)

    if(!document){  // if invalid id or no document by that id
        return res.status(404).json({
            error: "No such document"
        })
    }
    res.status(200).json(document)
}


// create new document
const createDocument = async (req, res) =>{
    const {title, id, age } = req.body
    // add document to db
    try {
        const newDocument = await DataModel.create({title, id, age})   //create new document with given params
        res.status(200).json(newDocument)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a document
const deleteDocument = async ( req, res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error: "Invalid Id format"
        })
    }
    const document = await DataModel.findOneAndDelete({_id: id})
    // in mongodb, id is identified by _id name

    if(!document){  // if invalid id or no document by that id
        return res.status(404).json({
            error: "No such document"
        })
    }

    res.status(200).json(document)



}

// update a document
const updateDocument = async(req, res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error: "Invalid Id format"
        })
    }
    const document = await DataModel.findOneAndUpdate({_id: id}, {
        // update parameters
        ...req.body
        // the json we send, will be used to update the passed parameters
        // this can be used instead of hardcoding a json
    })

    if(!document){  
        return res.status(404).json({
            error: "No such document"
        })
    }
    res.status(200).json(document)
}


module.exports = {
    getDocuments,
    getSingleDocument,
    createDocument,
    deleteDocument,
    updateDocument
}