const inventoryModel = require("../models/inventoryModel");
const mongoose = require("mongoose");
const getbloodRecords = async (req, res) => {
  try {
    const bloodGroups = ["O+", "O-", "A+", "A-", "AB+", "AB-", "B+", "B-"];
    const bloodGroupData = [];
    const organization = new mongoose.Types.ObjectId(req.body.userId);
    console.log(organization, "hahahahah");
    await Promise.all(
      bloodGroups.map(async (bloodGroup) => {
        // count total in
        const totalIn = await inventoryModel.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "in",
              organization,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" },
            },
          },
        ]);
        console.log(totalIn, "yeaaaah bussy");
        // total out
        const totalOut = await inventoryModel.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "out",
              organization,
            },
          },
          {
            $group: {
              _id: null,
              total: {
                $sum: "$quantity",
              },
            },
          },
        ]);
        // calculate total
        const availableBlood =
          (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

        // push data
        bloodGroupData.push({
          bloodGroup,
          totalIn: totalIn[0]?.total || 0,
          totalOut: totalOut[0]?.total || 0,
          availableBlood,
        });
      })
    );
    return res.status(200).send({
      success: true,
      message: "all data fetched successfully",
      bloodGroupData,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error fetching data",
      error,
    });
  }
};

module.exports = getbloodRecords;
