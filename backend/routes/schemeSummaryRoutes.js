const express = require("express");
const { getSchemeSummary } = require("../controllers/schemeSummaryController");

const router = express.Router();

router.get("/:schemeId/summary", getSchemeSummary);

module.exports = router;
