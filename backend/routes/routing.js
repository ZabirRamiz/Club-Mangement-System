const express = require('express')
const DataModel = require('../models/dataModel')    // importing table for working on it, if there are multiple such files, they need to be imported as well for working
const { 
    createDocument,
    getDocuments,
    getSingleDocument,
    deleteDocument,
    updateDocument
} =  require('../controllers/dataModelController')

const router = express.Router()

// get all workouts
router.get('/', getDocuments)

// get single workout

router.get('/:id', getSingleDocument)

// post a new workout

router.post('/', createDocument)


// delete a workout

router.delete('/:id', deleteDocument)

// update a workout

router.patch('/:id', updateDocument)


module.exports = router