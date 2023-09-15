const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const registerController = async (req, res) => {
  try {
    const existinguser = await userModel.findOne({ email: req.body.email });
    if (existinguser) {
      return res.status(200).send({
        success: false,
        message: "email aldready used",
      });
    }
    //hashed password
    var salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const user = new userModel(req.body);
    await user.save();
    return res.status(200).send({
      success: true,
      message: "user saved successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while registering",
    });
  }
};
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    if (user.role !== req.body.role) {
      return res.status(500).send({
        success: false,
        message: "role not found",
      });
    }
    const comparePassword = bcrypt.compare(req.body.password, user.password);
    if (!comparePassword) {
      res.status(500).send({
        success: false,
        message: "invalid credentials",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).send({
      success: true,
      message: "login Sucessfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.send(500).send({
      success: false,
      message: "error while Logging in",
    });
  }
};

const currentUserController = async (req, res) => {
  try {
    const currentUser = await userModel.findOne({ _id: req.body.userId });
    return res.status(200).send({
      message: "user fetched successfully",
      success: true,
      currentUser,
    });
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "current user not found",
    });
  }
};

module.exports = { registerController, loginController, currentUserController };
