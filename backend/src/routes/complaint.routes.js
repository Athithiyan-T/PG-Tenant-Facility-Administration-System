const router = require("express").Router();
const { protect, requireRole } = require("../middleware/auth.middleware");
const {
  createComplaint,
  listComplaints,
  updateComplaintStatus,
} = require("../controllers/complaint.controller");

router.use(protect);

router.get("/", listComplaints); // admin: all, tenant: own
router.post("/", requireRole("tenant"), createComplaint);
router.put("/:id/status", requireRole("admin"), updateComplaintStatus);

module.exports = router;

