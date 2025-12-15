const mongoose = require("mongoose");

const mspPriceSchema = new mongoose.Schema(
  {
    crop: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    displayName: {
      type: String,
      required: true
    },
    season: {
      type: String,
      enum: ["kharif", "rabi"],
      required: true
    },
    year: {
      type: String,
      required: true
    },
    msp: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      default: "Rs/Quintal"
    },
    source: {
      type: String,
      default: "data.gov.in"
    },
    resourceId: {
      type: String,
      required: true
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

mspPriceSchema.index(
  { crop: 1, season: 1, year: 1 },
  { unique: true }
);

mspPriceSchema.index({ season: 1, year: -1 });

module.exports = mongoose.model("MSPPrice", mspPriceSchema);
