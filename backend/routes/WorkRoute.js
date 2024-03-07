const express = require("express")
const {
    getWorks,
    getSingleWork,
    createWork,
    deleteWork,
    updateWork
} = require("../controllers/WorkModelController")

const router = express.Router()

router.get("/getWorks", getWorks)
router.get("/getSingleWork/:id", getSingleWork)
router.post("/createWork", createWork)
router.patch("/updateWork/:id", updateWork)
router.delete("/deleteWork/:id", deleteWork)

module.exports = router