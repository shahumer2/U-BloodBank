const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "role is required"],
      enum: ["admin", "organization", "hospital", "donar"],
    },

    name: {
      type: String,
      required: function () {
        if (this.role === "admin" || this.role === "user") {
          return true;
        }

        return false;
      },
    },
    organization: {
      type: String,
      required: function () {
        if (this.role === "organization") {
          return true;
        }

        return false;
      },
    },
    hospitalname: {
      type: String,
      required: function () {
        if (this.role === "hospital") {
          return true;
        }

        return false;
      },
    },

    email: {
      type: "string",
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: "string",
      required: [true, "password is required"],
      unique: true,
    },
    website: {
      type: "string",
    },
    adress: {
      type: "string",
      required: [true, "adress is required"],
    },
    phone: {
      type: "string",
      required: [true, "phone is required"],
      unique: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("users", userSchema);
