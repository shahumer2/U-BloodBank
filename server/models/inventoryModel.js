const { mongoose } = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    inventoryType: {
      type: String,
      required: [true, "inventory is mandatory"],
      enum: ["in", "out"],
    },
    bloodGroup: {
      type: String,
      required: [true, "blood group is required"],
      enum: ["O+", "O-", "A+", "A-", "AB+", "AB-", "B+", "B-"],
    },
    quantity: {
      type: Number,
      required: [true, "quantity is required"],
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "organization name is required"],
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "out";
      },
    },
    email: {
      type: String,
      required: true,
    },
    donar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "in";
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("inventory", inventorySchema);
