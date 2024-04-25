const EventModel = require('../models/EventModel')
const mongoose = require('mongoose')

// get all events
const getEvents = async (req, res) =>{
    const events = await EventModel.find({
        // blank means all events
    }).sort({createdAt: -1} )   //sorting in descending order of creation time

    res.status(200).json(events)
}

// get single event
const getSingleEvent = async (req, res) =>{
    const { id } = req.params // id comes from '/:id'

    // if id format is invalid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error: "Invalid Id format"
        })
    }

    const event = await EventModel.findById(id)

    if(!event){  // if invalid id or no event by that id
        return res.status(404).json({
            error: "No such event"
        })
    }
    res.status(200).json(event)
}


// create new event
const createEvent = async (req, res) =>{
    const {title, date, time, venue, guests, type, budget, sponsor, pr } = req.body
    // add event to db
    try {
        const newEvent = await EventModel.create({title, date, time, venue, guests, type, budget, sponsor, pr})   //create new event with given params
        res.status(200).json(newEvent)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a event
const deleteEvent = async ( req, res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error: "Invalid Id format"
        })
    }
    const event = await EventModel.findOneAndDelete({_id: id})
    // in mongodb, id is identified by _id name

    if(!event){  // if invalid id or no event by that id
        return res.status(404).json({
            error: "No such event"
        })
    }

    res.status(200).json(event)



}

// update a event
const updateEvent = async(req, res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error: "Invalid Id format"
        })
    }
    const event = await EventModel.findOneAndUpdate({_id: id}, {
        // update parameters
        ...req.body
        // the json we send, will be used to update the passed parameters
        // this can be used instead of hardcoding a json
    })

    if(!event){  
        return res.status(404).json({
            error: "No such event"
        })
    }
    res.status(200).json(event)
}

//get upcoming events
const upcomingEvents = async(req, res) =>{
    try {
        // Get today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to beginning of the day

        // Find upcoming events where the date stored in the model is later than today's date
        const events = await EventModel.find({ date: { $gt: today } });
        
        // Send the upcoming events as response
        res.json(events);
    } catch (error) {
        // Handle error
        console.error('Error fetching upcoming events:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
}
//get past events
const pastEvents = async(req, res) =>{
    try {
        // Get today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to beginning of the day

        // Find upcoming events where the date stored in the model is later than today's date
        const events = await EventModel.find({ date: { $lt: today } });
        console.log(today)
        // Send the upcoming events as response
        res.json(events);
    } catch (error) {
        // Handle error
        console.error('Error fetching past events:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
}
module.exports = {
    getEvents,
    getSingleEvent,
    createEvent,
    deleteEvent,
    updateEvent,
    upcomingEvents,
    pastEvents
}