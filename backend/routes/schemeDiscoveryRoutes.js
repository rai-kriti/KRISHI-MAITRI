const express = require("express");
const { getSchemesByState } = require("../controllers/schemeDiscoveryController");

const router = express.Router();

router.get("/", getSchemesByState);

module.exports = router;
