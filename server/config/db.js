const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to the database SucessFully");
  } catch (error) {
    console.log("mongoose database error", error);
  }
};
module.exports = connectDB;
