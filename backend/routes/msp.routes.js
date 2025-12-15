const express = require("express");
const MSPPrice = require("../models/MSPPrice");
const { getCache, setCache } = require("../utils/cache");

const router = express.Router();

/* ======================
   1️⃣ CROPS LIST (MOST SPECIFIC)
====================== */
router.get("/crops/:season", async (req, res) => {
  const { season } = req.params;

  if (!["kharif", "rabi"].includes(season)) {
    return res.status(400).json({
      success: false,
      message: "Invalid season"
    });
  }

  try {
    const crops = await MSPPrice.aggregate([
      { $match: { season } },
      {
        $group: {
          _id: "$crop",
          displayName: { $first: "$displayName" }
        }
      },
      { $sort: { displayName: 1 } },
      {
        $project: {
          _id: 0,
          crop: "$_id",
          displayName: 1
        }
      }
    ]);

    res.json({ success: true, crops });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ======================
   2️⃣ MSP WIDGET
====================== */
router.get("/widget", async (req, res) => {
  try {
    const data = await MSPPrice.aggregate([
      { $sort: { year: -1 } },
      {
        $group: {
          _id: { crop: "$crop", season: "$season" },
          displayName: { $first: "$displayName" },
          year: { $first: "$year" },
          msp: { $first: "$msp" }
        }
      },
      {
        $project: {
          _id: 0,
          crop: "$_id.crop",
          season: "$_id.season",
          displayName: 1,
          year: 1,
          msp: 1
        }
      }
    ]);

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ======================
   3️⃣ MSP TREND (MOST GENERIC — LAST)
====================== */
router.get("/:season/:crop", async (req, res) => {
  const { season, crop } = req.params;

  if (!["kharif", "rabi"].includes(season)) {
    return res.status(400).json({
      success: false,
      message: "Invalid season"
    });
  }

  try {
    const data = await MSPPrice.find(
      { season, crop },
      { _id: 0, year: 1, msp: 1 }
    ).sort({ year: 1 });

    if (!data.length) {
      return res.status(404).json({
        success: false,
        message: "No MSP data found for this commodity"
      });
    }

    res.json({ success: true, season, crop, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


/*=====================
     CACHE
 ====================== */
 router.get("/widget", async (req, res) => {
  const cacheKey = "msp_widget";
  const cached = getCache(cacheKey);

  if (cached) {
    return res.json({ success: true, data: cached, cached: true });
  }

  const data = await MSPPrice.aggregate([
  { $sort: { year: -1 } },
  {
    $group: {
      _id: { crop: "$crop", season: "$season" },
      displayName: { $first: "$displayName" },
      year: { $first: "$year" },
      msp: { $first: "$msp" }
    }
  },
  {
    $project: {
      _id: 0,
      crop: "$_id.crop",
      season: "$_id.season",
      displayName: 1,
      year: 1,
      msp: 1
    }
  }
]);


  setCache(cacheKey, data, 6 * 60 * 60 * 1000); // 6 hours
  res.json({ success: true, data });
});

module.exports = router;
