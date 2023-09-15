const express = require("express");
const getbloodRecords = require("../controller/analyticsController.js");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");

// add inventory

router.get("/bloodGroups-data", authMiddleware, getbloodRecords);

module.exports = router;
