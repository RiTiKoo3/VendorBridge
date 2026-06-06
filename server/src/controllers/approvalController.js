const Approval = require("../models/Approval");

// Create Approval

const createApproval = async (req, res) => {
  try {
    const approval = await Approval.create(req.body);

    res.status(201).json({
      success: true,
      approval,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Approvals

const getApprovals = async (req, res) => {
  try {
    const approvals = await Approval.find()
      .populate({
        path: "quotationId",
        populate: [
          {
            path: "rfqId",
          },
          {
            path: "vendorId",
          },
        ],
      });

    res.status(200).json({
      success: true,
      approvals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createApproval,
  getApprovals,
};