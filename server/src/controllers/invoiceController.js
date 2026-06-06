const Invoice = require("../models/Invoice");

// Create Invoice

const createInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.create(
      req.body
    );

    res.status(201).json({
      success: true,
      invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Invoices

const getInvoices = async (req, res) => {
  try {
    const invoices =
      await Invoice.find().populate({
        path: "purchaseOrderId",
        populate: {
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
        },
      });

    res.status(200).json({
      success: true,
      invoices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createInvoice,
  getInvoices,
};