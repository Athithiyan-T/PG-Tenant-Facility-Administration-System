const ServiceRequest = require("../models/ServiceRequest");

async function createServiceRequest(req, res, next) {
  try {
    const { serviceType, details } = req.body;
    if (!serviceType) {
      res.status(400);
      throw new Error("serviceType is required");
    }
    const reqDoc = await ServiceRequest.create({
      tenant: req.user._id,
      room: req.user.room || null,
      serviceType,
      details: details || "",
      status: "Pending",
    });
    res.status(201).json({ serviceRequest: reqDoc });
  } catch (err) {
    next(err);
  }
}

async function listServiceRequests(req, res, next) {
  try {
    const filter = {};
    if (req.user.role === "tenant") filter.tenant = req.user._id;

    const serviceRequests = await ServiceRequest.find(filter)
      .populate("tenant", "name email")
      .populate("room", "roomNumber")
      .sort({ createdAt: -1 });

    res.json({ serviceRequests });
  } catch (err) {
    next(err);
  }
}

async function updateServiceStatus(req, res, next) {
  try {
    const { status } = req.body;
    if (!status) {
      res.status(400);
      throw new Error("status is required");
    }
    const reqDoc = await ServiceRequest.findById(req.params.id);
    if (!reqDoc) {
      res.status(404);
      throw new Error("Service request not found");
    }
    reqDoc.status = status;
    await reqDoc.save();
    res.json({ serviceRequest: reqDoc });
  } catch (err) {
    next(err);
  }
}

module.exports = { createServiceRequest, listServiceRequests, updateServiceStatus };

