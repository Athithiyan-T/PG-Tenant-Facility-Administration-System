const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema(
  {
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", default: null },
    serviceType: {
      type: String,
      required: true,
      enum: ["cleaning", "food", "cctv", "washing", "electrical", "wifi"],
    },
    details: { type: String, default: "", trim: true },
    status: { type: String, enum: ["Pending", "In Progress", "Resolved"], default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);

