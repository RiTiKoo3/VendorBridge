const mongoose = require("mongoose");

const purchaseOrderSchema = new mongoose.Schema(
  {
    approvalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Approval",
      required: true,
    },

    poNumber: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Issued",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "PurchaseOrder",
  purchaseOrderSchema
);