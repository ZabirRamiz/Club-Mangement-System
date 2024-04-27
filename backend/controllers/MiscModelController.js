const MiscModel = require("../models/MiscModel");
const mongoose = require("mongoose");

const getAllMisc = async (req, res) => {
  const misc = await MiscModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(misc);
};

module.exports = {getAllMisc}