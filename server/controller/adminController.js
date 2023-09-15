const userModel = require("../models/userModel");

const getDonarListController = async (req, res) => {
  try {
    const donarList = await userModel
      .find({ role: "donar" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      totalLength: donarList.length,
      message: "all donar list fetched successfully",
      donarList,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,

      message: "error fetching donar list",
      error,
    });
  }
};

const getHospitalListController = async (req, res) => {
  try {
    const hospitalList = await userModel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      totalLength: hospitalList.length,
      message: "all donar list fetched successfully",
      hospitalList,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "error fetching donar list",
      error,
    });
  }
};
const getOrganizationListController = async (req, res) => {
  try {
    const organizationList = await userModel
      .find({ role: "organization" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      totalLength: organizationList.length,
      message: "all donar list fetched successfully",
      organizationList,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "error fetching donar list",
      error,
    });
  }
};

const deleteDonarController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "donar deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while deleting donar",
      error,
    });
  }
};
const deleteHospitalController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "hospital deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while deleting donar",
      error,
    });
  }
};
const deleteOrganizationController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "organization deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while deleting donar",
      error,
    });
  }
};

module.exports = {
  getDonarListController,
  getHospitalListController,
  getOrganizationListController,
  deleteDonarController,
  deleteHospitalController,
  deleteOrganizationController,
};
