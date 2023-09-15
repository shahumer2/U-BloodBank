const express = require("express");
const {
  createInventoryController,
  getInventoryController,
  getdonarController,
  gethospitalsController,
  getOrganizationController,
  getOrganizationForHospitalControler,
  getInventoryHositalController,
  getRecentbloodrecord,
} = require("../controller/inventoryController.js");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");

// add inventory
router.post("/create-inventory", authMiddleware, createInventoryController);
router.get("/get-inventory", authMiddleware, getInventoryController);
router.get("/get-recent-inventory", authMiddleware, getRecentbloodrecord);
router.post(
  "/get-inventory-hospital",
  authMiddleware,
  getInventoryHositalController
);
router.get("/get-donar", authMiddleware, getdonarController);
router.get("/get-hospitals", authMiddleware, gethospitalsController);
router.get("/get-organization", authMiddleware, getOrganizationController);
router.get(
  "/get-organization-for-hospital",
  authMiddleware,
  getOrganizationForHospitalControler
);
module.exports = router;
