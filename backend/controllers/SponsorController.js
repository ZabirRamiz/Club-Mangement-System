const SponsorModel = require("../models/SponsorModel")
const mongoose = require("mongoose")

const getSponsors = async(req, res) =>{
    const sponsors = await SponsorModel.find({ }).sort({createdAt: -1})
    res.status(200).json(sponsors)
}

const getSingleSponsor = async (req, res) =>{
    const { id } = req.params
    console.log(id)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error: "Invalid Id format"
        })
    }

    const sponsor = await SponsorModel.findById(id)

    if(!sponsor){
        return res.status(404).json({
            error: "No such Sponsor"
        })
    }
    res.status(200).json(sponsor)

}

const createSponsor = async (req, res) =>{
    const {name, type, more_info, phone, email, sponsor_status} = req.body
    try{
        const newSponsor = await SponsorModel.create({
            name,
            type,
            more_info,
            phone, 
            email,
            sponsor_status
        })
        res.status(200).json(newSponsor)
    }
    catch{
        res.status(400).json({error: "error.message"})
    }
}

const deleteSponsor = async (req, res) =>{
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error: "Invalid Id format"
        })
    }

    const sponsor = await SponsorModel.findOneAndDelete({_id: id})

    if(!sponsor){
        return res.staus(400).json({
            error:"No such sponsor"
        })
    }
    res.staus(200).json(sponsor)
}

const updateSponsor = async (req, res) =>{
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error: "Invalid Id format"
        })
    }
    const sponsor = await SponsorModel.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if(!sponsor){
        return res.staus(404).json({
            error: "No such Sponsor"
        })
    }
    res.status(200).json(sponsor)
}

module.exports = {
    getSponsors,
    getSingleSponsor,
    createSponsor,
    deleteSponsor,
    updateSponsor
}