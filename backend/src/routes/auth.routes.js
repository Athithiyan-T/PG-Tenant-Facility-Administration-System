const router = require("express").Router();
const { login, me, registerTenant, registerAdmin } = require("../controllers/auth.controller");
const { protect, requireRole } = require("../middleware/auth.middleware");

router.post("/login", login);
router.get("/me", protect, me);

// Admin tools
router.post("/register-admin", protect, requireRole("admin"), registerAdmin);
router.post("/register-tenant", protect, requireRole("admin"), registerTenant);

module.exports = router;

