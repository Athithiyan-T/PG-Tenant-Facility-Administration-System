const router = require("express").Router();
const { protect, requireRole } = require("../middleware/auth.middleware");
const {
  createServiceRequest,
  listServiceRequests,
  updateServiceStatus,
} = require("../controllers/service.controller");

router.use(protect);

router.get("/", listServiceRequests); // admin: all, tenant: own
router.post("/", requireRole("tenant"), createServiceRequest);
router.put("/:id/status", requireRole("admin"), updateServiceStatus);

module.exports = router;

