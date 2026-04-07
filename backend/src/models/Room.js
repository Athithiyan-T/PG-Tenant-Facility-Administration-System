const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: { type: String, required: true, unique: true, trim: true },
    floor: { type: Number, default: 0 },
    capacity: { type: Number, default: 1 },
    currentTenants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);

