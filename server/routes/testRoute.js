const express = require("express");
const authController = require("../controller/authController");
const { testController } = require("../controller/testController");
testController
const router = express.Router();



router.get("/", testController)


module.exports = router