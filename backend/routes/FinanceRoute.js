
const express = require("express")
const {
    getFinances,
    getSingleFinance,
    createFinance,
    deleteFinance,
    updateFinance
} = require("../controllers/FinanceModelController")

const router = express.Router()

router.get("/getFinances", getFinances)
router.get("/getSingleFinance/:id", getSingleFinance)
router.post("/createFinance", createFinance)
router.patch("/updateFinance/:id", updateFinance)
router.delete("/deleteFinance/:id", deleteFinance)

module.exports = router