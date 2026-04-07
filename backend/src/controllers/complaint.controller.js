const Complaint = require("../models/Complaint");

async function createComplaint(req, res, next) {
  try {
    const { category, title, description } = req.body;
    if (!category || !title || !description) {
      res.status(400);
      throw new Error("category, title, description are required");
    }
    const complaint = await Complaint.create({
      tenant: req.user._id,
      room: req.user.room || null,
      category,
      title,
      description,
      status: "Pending",
    });
    res.status(201).json({ complaint });
  } catch (err) {
    next(err);
  }
}

async function listComplaints(req, res, next) {
  try {
    const filter = {};
    if (req.user.role === "tenant") filter.tenant = req.user._id;

    const complaints = await Complaint.find(filter)
      .populate("tenant", "name email")
      .populate("room", "roomNumber")
      .sort({ createdAt: -1 });

    res.json({ complaints });
  } catch (err) {
    next(err);
  }
}

async function updateComplaintStatus(req, res, next) {
  try {
    const { status } = req.body;
    if (!status) {
      res.status(400);
      throw new Error("status is required");
    }
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      res.status(404);
      throw new Error("Complaint not found");
    }
    complaint.status = status;
    await complaint.save();
    res.json({ complaint });
  } catch (err) {
    next(err);
  }
}

module.exports = { createComplaint, listComplaints, updateComplaintStatus };

