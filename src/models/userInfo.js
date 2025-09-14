const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    }, status: {
      default: "pending",
      type: String
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserInfo", userInfoSchema);
