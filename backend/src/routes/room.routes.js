const router = require("express").Router();
const { protect, requireRole } = require("../middleware/auth.middleware");
const {
  listRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  myRoom,
} = require("../controllers/room.controller");

router.use(protect);

router.get("/", requireRole("admin"), listRooms);
router.get("/my", requireRole("tenant"), myRoom);
router.get("/:id", getRoom);

router.post("/", requireRole("admin"), createRoom);
router.put("/:id", requireRole("admin"), updateRoom);
router.delete("/:id", requireRole("admin"), deleteRoom);

module.exports = router;

