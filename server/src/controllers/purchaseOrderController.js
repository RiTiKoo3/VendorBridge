const PurchaseOrder = require("../models/PurchaseOrder");

// Create PO

const createPurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.create(req.body);

    res.status(201).json({
      success: true,
      purchaseOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All POs

const getPurchaseOrders = async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrder.find().populate({
      path: "approvalId",
      populate: {
        path: "quotationId",
        populate: [
          {
            path: "rfqId",
          },
          {
            path: "vendorId",
          },
        ],
      },
    });

    res.status(200).json({
      success: true,
      purchaseOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPurchaseOrder,
  getPurchaseOrders,
};
