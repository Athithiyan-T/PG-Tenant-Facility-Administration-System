const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", default: null },
    category: {
      type: String,
      required: true,
      enum: ["cleaning", "food", "cctv", "washing", "electrical", "wifi", "other"],
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: { type: String, enum: ["Pending", "In Progress", "Resolved"], default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);

