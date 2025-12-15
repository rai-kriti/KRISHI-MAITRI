import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
import MSPPrice from "../models/MSPPrice.js";

dotenv.config();

/* ================== CONFIG ================== */

const KHARIF_RESOURCE_ID = "37a192d8-355d-409a-845a-00d0f6cfac55";
const RABI_RESOURCE_ID   = "b45f166a-9a89-492f-a8ed-3cb245850408";

const DATA_GOV_BASE = "https://api.data.gov.in/resource";
const API_KEY = process.env.DATA_GOV_API_KEY;
const MONGO_URI = process.env.MONGO_URI;

/* ================== DB CONNECT ================== */

async function connectDB() {
  await mongoose.connect(MONGO_URI, {
    autoIndex: true
  });
  console.log("✅ MongoDB connected");
}

/* ================== HELPERS ================== */

function normalizeCropKey(name) {
  return name
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/\s+/g, "_")
    .trim();
}

function extractYear(key, prefix) {
  // kms_2024_25  -> 2024-25
  return key
    .replace(prefix, "")
    .replace("_", "-");
}

/* ================== FETCH ================== */

async function fetchDataset(resourceId) {
  const url = `${DATA_GOV_BASE}/${resourceId}`;

  const res = await axios.get(url, {
    params: {
      "api-key": API_KEY,
      format: "json",
      limit: 100
    }
  });

  return res.data.records || [];
}

/* ================== INGEST KHARIF ================== */

async function ingestKharif() {
  console.log("🌾 Syncing KHARIF MSP...");

  const records = await fetchDataset(KHARIF_RESOURCE_ID);

  for (const row of records) {
    const displayName = row.commodities;
    const cropKey = normalizeCropKey(displayName);

    for (const key of Object.keys(row)) {
      if (!key.startsWith("kms_")) continue;
      if (row[key] == null) continue;

      const year = extractYear(key, "kms_");

      await MSPPrice.updateOne(
        { crop: cropKey, season: "kharif", year },
        {
          $set: {
            crop: cropKey,
            displayName,
            season: "kharif",
            year,
            msp: row[key],
            source: "data.gov.in",
            resourceId: KHARIF_RESOURCE_ID,
            lastUpdated: new Date()
          }
        },
        { upsert: true }
      );
    }
  }

  console.log("✅ KHARIF MSP synced");
}

/* ================== INGEST RABI ================== */

async function ingestRabi() {
  console.log("🌾 Syncing RABI MSP...");

  const records = await fetchDataset(RABI_RESOURCE_ID);

  for (const row of records) {
    const displayName = row.commodities;
    const cropKey = normalizeCropKey(displayName);

    for (const key of Object.keys(row)) {
      if (!key.startsWith("rms_")) continue;
      if (row[key] == null) continue;

      const year = extractYear(key, "rms_");

      await MSPPrice.updateOne(
        { crop: cropKey, season: "rabi", year },
        {
          $set: {
            crop: cropKey,
            displayName,
            season: "rabi",
            year,
            msp: row[key],
            source: "data.gov.in",
            resourceId: RABI_RESOURCE_ID,
            lastUpdated: new Date()
          }
        },
        { upsert: true }
      );
    }
  }

  console.log("✅ RABI MSP synced");
}

/* ================== MAIN ================== */

async function run() {
  try {
    if (!API_KEY || !MONGO_URI) {
      throw new Error("Missing DATA_GOV_API_KEY or MONGO_URI");
    }

    await connectDB();
    await ingestKharif();
    await ingestRabi();

    console.log("🎉 MSP SYNC COMPLETED");
  } catch (err) {
    console.error("❌ MSP sync failed:", err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
