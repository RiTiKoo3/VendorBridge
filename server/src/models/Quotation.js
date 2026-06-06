const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema(
  {
    rfqId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RFQ",
      required: true,
    },

    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    deliveryDays: {
      type: Number,
      required: true,
    },

    notes: {
        type:String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Quotation",
  quotationSchema
);