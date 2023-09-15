const express = require("express");
const {registerController,loginController,currentUserController} = require("../controller/authController.js");
const authMiddleware = require("../middleware/authMiddleware.js");




const router = express.Router();



router.post("/register", registerController)
router.post("/login", loginController)
router.get("/currentuser",authMiddleware, currentUserController)


module.exports = router