const Quotation = require("../models/Quotation");

// Create Quotation

const createQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.create(req.body);

    res.status(201).json({
      success: true,
      quotation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Quotations

const getQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find()
      .populate("rfqId")
      .populate("vendorId");

    res.status(200).json({
      success: true,
      quotations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createQuotation,
  getQuotations,
};