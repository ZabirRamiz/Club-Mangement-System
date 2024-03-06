const express = require("express")
const {
    getEvents,
    getSingleEvent,
    createEvent,
    deleteEvent,
    updateEvent
} = require("../controllers/EventModelController")

const router = express.Router()

router.get("/getEvents", getEvents)
router.get("/getSingleEvent/:id", getSingleEvent)
router.post("/createEvent", createEvent)
router.patch("/updateEvent/:id", updateEvent)
router.delete("/deleteEvent/:id", deleteEvent)

module.exports = router