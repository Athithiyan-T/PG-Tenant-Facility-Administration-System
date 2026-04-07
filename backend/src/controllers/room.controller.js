const Room = require("../models/Room");
const User = require("../models/User");

async function listRooms(req, res, next) {
  try {
    const rooms = await Room.find().sort({ roomNumber: 1 });
    res.json({ rooms });
  } catch (err) {
    next(err);
  }
}

async function getRoom(req, res, next) {
  try {
    const room = await Room.findById(req.params.id).populate("currentTenants", "name email role");
    if (!room) {
      res.status(404);
      throw new Error("Room not found");
    }
    res.json({ room });
  } catch (err) {
    next(err);
  }
}

async function createRoom(req, res, next) {
  try {
    const { roomNumber, floor, capacity, notes } = req.body;
    if (!roomNumber) {
      res.status(400);
      throw new Error("roomNumber is required");
    }
    const exists = await Room.findOne({ roomNumber: roomNumber.trim() });
    if (exists) {
      res.status(400);
      throw new Error("roomNumber already exists");
    }
    const room = await Room.create({
      roomNumber,
      floor: Number.isFinite(floor) ? floor : floor ? Number(floor) : 0,
      capacity: Number.isFinite(capacity) ? capacity : capacity ? Number(capacity) : 1,
      notes: notes || "",
    });
    res.status(201).json({ room });
  } catch (err) {
    next(err);
  }
}

async function updateRoom(req, res, next) {
  try {
    const { roomNumber, floor, capacity, notes } = req.body;
    const room = await Room.findById(req.params.id);
    if (!room) {
      res.status(404);
      throw new Error("Room not found");
    }

    if (roomNumber && roomNumber.trim() !== room.roomNumber) {
      const exists = await Room.findOne({ roomNumber: roomNumber.trim() });
      if (exists) {
        res.status(400);
        throw new Error("roomNumber already exists");
      }
      room.roomNumber = roomNumber.trim();
    }
    if (floor !== undefined) room.floor = Number(floor);
    if (capacity !== undefined) room.capacity = Number(capacity);
    if (notes !== undefined) room.notes = notes;

    await room.save();
    res.json({ room });
  } catch (err) {
    next(err);
  }
}

async function deleteRoom(req, res, next) {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      res.status(404);
      throw new Error("Room not found");
    }

    // detach tenants from this room
    await User.updateMany({ room: room._id }, { $set: { room: null } });
    await room.deleteOne();
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

// Tenant convenience: get room tied to current tenant
async function myRoom(req, res, next) {
  try {
    if (req.user.role !== "tenant") {
      res.status(403);
      throw new Error("Forbidden");
    }
    if (!req.user.room) {
      res.json({ room: null });
      return;
    }
    const room = await Room.findById(req.user.room).populate("currentTenants", "name email role");
    res.json({ room });
  } catch (err) {
    next(err);
  }
}

module.exports = { listRooms, getRoom, createRoom, updateRoom, deleteRoom, myRoom };

