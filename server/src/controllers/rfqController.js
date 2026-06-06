const RFQ = require("../models/RFQ");

// Create RFQ
const createRFQ = async (req, res) => {
  try {
    const rfq = await RFQ.create(req.body);

    res.status(201).json({
      success: true,
      rfq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All RFQs
const getRFQs = async (req, res) => {
  try {
    const rfqs = await RFQ.find().populate("vendorId");

    res.status(200).json({
      success: true,
      rfqs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createRFQ,
  getRFQs,
};