const express = require("express")
const {
    getEvents,
    getSingleEvent,
    createEvent,
    deleteEvent,
    updateEvent,
    upcomingEvents,
    pastEvents
} = require("../controllers/EventModelController")

const router = express.Router()

router.get("/getEvents", getEvents)
router.get("/getSingleEvent/:id", getSingleEvent)
router.get("/getUpcomingEvents",upcomingEvents)
router.get("/getPastEvents",pastEvents)
router.post("/createEvent", createEvent)
router.patch("/updateEvent/:id", updateEvent)
router.delete("/deleteEvent/:id", deleteEvent)


module.exports = router