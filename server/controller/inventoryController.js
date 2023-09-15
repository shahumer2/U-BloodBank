const mongoose = require("mongoose");
var userModel = require("../models/userModel");
var inventoryModel = require("../models/inventoryModel");

const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("user not found");
    }
    // if(inventoryType==="in"&& user.role !=="donar"){
    //     throw new Error("not a donor")
    // }
    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("not a hospital");
    // }
    if (req.body.inventoryType === "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedBloodQuantity = req.body.quantity;
      const organization = new mongoose.Types.ObjectId(req.body.userId);
      // calculate blood quantity by aggregate method

      const totalinOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);

      const totalin = totalinOfRequestedBlood[0]?.total || 0;
      console.log(totalin);
      const totaloutOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalout = totaloutOfRequestedBlood[0]?.total || 0;

      // now i and out total calc

      const availableBloodGroup = totalin - totalout;

      // now validatiion

      if (availableBloodGroup < requestedBloodQuantity) {
        return res.status(500).send({
          success: false,
          message: `only ${availableBloodGroup} ML is available for ${requestedBloodGroup}`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }

    // save inventory

    const inventory = new inventoryModel(req.body);

    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "new blood record saved successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "error creating invetory",
      status: false,
    });
  }
};

const getInventoryController = async (req, res) => {
  try {
    console.log(req.body);
    const inventory = await inventoryModel
      .find({
        organization: req.body.userId,
      })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      messaage: "get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get All Inventory",
      error,
    });
  }
};

// get hospital consumer controller for hospotal role

const getInventoryHositalController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find(req.body.filters)
      .populate("donar")
      .populate("hospital")
      .populate("organization")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      messaage: "get all hospital  records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get All Inventory",
      error,
    });
  }
};
//get blood record of 3
const getRecentbloodrecord = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organization: req.body.userId,
      })
      .limit(3)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      messsage: "all recent records fetched",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "record not fetched",
      error,
    });
  }
};
// get donar

const getdonarController = async (req, res) => {
  try {
    const organization = req.body.userId;
    // organization beacause org also want to see the donar
    // by match we store data in variable by aggreagate and dintinct("donar " beause we have donar field present in our db)
    const donarId = await inventoryModel.distinct("donar", {
      organization,
    });

    const donars = await userModel.find({ _id: { $in: donarId } });

    return res.status(200).send({
      success: true,
      message: "donar fetrched successfully",
      donars,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In donar Records",
      error,
    });
  }
};

const gethospitalsController = async (req, res) => {
  try {
    const organization = req.body.userId;
    const hospitalId = await inventoryModel.distinct("hospital", {
      organization,
    });
    // find hospital

    const hospitals = await userModel.find({
      _id: { $in: hospitalId },
    });
    return res.status(200).send({
      success: true,
      message: "hospitals fetched successfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In donar Records",
      error,
    });
  }
};
const getOrganizationController = async (req, res) => {
  try {
    const donar = req.body.userId;
    const orgId = await inventoryModel.distinct("organization", { donar });
    // find org

    const organizations = await userModel.find({ _id: { $in: orgId } });
    return res.status(200).send({
      success: true,
      message: "organzation fetched successfully",
      organizations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In organization Records",
      error,
    });
  }
};
const getOrganizationForHospitalControler = async (req, res) => {
  try {
    const hospital = req.body.userId;
    const orgId = await inventoryModel.distinct("organization", { hospital });
    // find org

    const organizations = await userModel.find({ _id: { $in: orgId } });
    console.log(organizations);
    return res.status(200).send({
      success: true,
      message: "hospital-organzation fetched successfully",
      organizations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In organization Records",
      error,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getdonarController,
  gethospitalsController,
  getOrganizationController,
  getOrganizationForHospitalControler,
  getInventoryHositalController,
  getRecentbloodrecord,
};
