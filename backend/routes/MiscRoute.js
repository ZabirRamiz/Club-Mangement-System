const express = require("express")
const {
    getAllMisc
} = require("../controllers/MiscModelController")

const router = express.Router()

router.get("/getAllMisc", getAllMisc)

module.exports = router