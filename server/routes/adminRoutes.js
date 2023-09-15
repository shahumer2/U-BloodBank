const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getDonarListController,
  getHospitalListController,
  getOrganizationListController,
  deleteDonarController,
  deleteHospitalController,
  deleteOrganizationController,
} = require("../controller/adminController.js");
const adminMiddleware = require("../middleware/adminMiddleware.js");

const router = express.Router();

//get donar list

router.get(
  "/donar-list",
  authMiddleware,
  adminMiddleware,
  getDonarListController
);
router.get(
  "/hospital-list",
  authMiddleware,
  adminMiddleware,
  getHospitalListController
);
router.get(
  "/organization-list",
  authMiddleware,
  adminMiddleware,
  getOrganizationListController
);
router.delete(
  "/delete-donar/:id",
  authMiddleware,
  adminMiddleware,
  deleteDonarController
);
router.delete(
  "/delete-hospital/:id",
  authMiddleware,
  adminMiddleware,
  deleteHospitalController
);
router.delete(
  "/delete-organization/:id",
  authMiddleware,
  adminMiddleware,
  deleteOrganizationController
);

module.exports = router;
