const mongoose =  require("mongoose");

const rfqSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    quantity: {
      type: Number,
      required: true,
    },

    deadline: {
      type: Date,
      required: true,
    },

    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },

    status: {
      type: String,
      enum: ["draft", "active", "closed", "approved"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RFQ", rfqSchema);