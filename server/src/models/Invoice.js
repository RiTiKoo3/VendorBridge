const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    purchaseOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseOrder",
      required: true,
    },

    invoiceNumber: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "Paid",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Invoice",
  invoiceSchema
);