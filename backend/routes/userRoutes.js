const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Farmer = require("../models/Farmer");

// GET current logged-in user's profile
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const firebaseUID = req.user.firebaseUID;

    const farmer = await Farmer.findOne({ firebaseUID });

    if (!farmer) {
      return res.json({
        success: true,
        profile: null,
      });
    }

    return res.json({
      success: true,
      profile: farmer,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// UPDATE onboarding/profile (step-wise)
router.post("/onboard", authMiddleware, async (req, res) => {
  try {
    const firebaseUID = req.user.firebaseUID;

    const {
      name,
      pincode,
      state,
      district,
      cityVillage,
    } = req.body;

    const farmer = await Farmer.findOneAndUpdate(
      { firebaseUID },
      {
        $set: {
          name,
          pincode,
          state,
          district,
          cityVillage,
        },
      },
      { new: true, upsert: true }
    );

    return res.json({
      success: true,
      profile: farmer,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Onboarding failed",
    });
  }
});


module.exports = router;
