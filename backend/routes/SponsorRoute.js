const express = require("express")
const {
    getSponsors,
    getSingleSponsor,
    createSponsor,
    deleteSponsor,
    updateSponsor

} =  require("../controllers/SponsorController")

const router = express.Router()

router.get("/getSponsors", getSponsors)
router.get("/getSingleSponsor/:id", getSingleSponsor)
router.post("/createSponsor", createSponsor)
router.patch("/updateSponsor/:id", updateSponsor)
router.delete("/deleteSponsor/:id", deleteSponsor)

module.exports = router