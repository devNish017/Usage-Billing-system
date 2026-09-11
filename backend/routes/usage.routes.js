const express = require("express");
const { startUsage,stopUsage,getActiveUsages,getUsageHistory} = require("../controllers/usage.controller");

const router = express.Router();
router.post("/start", startUsage);
router.post("/stop", stopUsage);
router.get("/active", getActiveUsages);
router.get("/history", getUsageHistory);

module.exports = router;