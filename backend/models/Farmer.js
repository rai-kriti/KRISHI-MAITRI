const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema(
  {
    firebaseUID: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    phoneNumber: {
      type: String,
      required: true
    },

    // 👤 identity
    name: {
      type: String,
      default: ""
    },

    // 📍 location
    pincode: {
      type: String,
      default: ""
    },
    state: {
      type: String,
      default: ""
    },
    district: {
      type: String,
      default: ""
    },
    cityVillage: {
      type: String,
      default: ""
    },

    // 🌾 farming profile
    landSize: String,
    soilType: String,
    waterSource: String,
    primaryCrop: String,

    language: {
      type: String,
      default: "English"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Farmer", farmerSchema);
