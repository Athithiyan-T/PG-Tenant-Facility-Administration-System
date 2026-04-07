const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Room = require("../models/Room");
const { signToken } = require("../utils/jwt");

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    room: user.room,
    createdAt: user.createdAt,
  };
}

// Admin-only: create tenants (and optionally link to a room)
async function registerTenant(req, res, next) {
  try {
    const { name, email, password, roomId } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("name, email, password are required");
    }

    const exists = await User.findOne({ email: email.toLowerCase().trim() });
    if (exists) {
      res.status(400);
      throw new Error("Email already in use");
    }

    let room = null;
    if (roomId) {
      room = await Room.findById(roomId);
      if (!room) {
        res.status(400);
        throw new Error("Invalid roomId");
      }
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      passwordHash,
      role: "tenant",
      room: room ? room._id : null,
    });

    if (room) {
      room.currentTenants.addToSet(user._id);
      await room.save();
    }

    res.status(201).json({ user: publicUser(user) });
  } catch (err) {
    next(err);
  }
}

// Admin-only: create another admin (kept simple)
async function registerAdmin(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("name, email, password are required");
    }

    const exists = await User.findOne({ email: email.toLowerCase().trim() });
    if (exists) {
      res.status(400);
      throw new Error("Email already in use");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, role: "admin" });

    res.status(201).json({ user: publicUser(user) });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("email and password are required");
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    const token = signToken(user._id);
    res.json({ token, user: publicUser(user) });
  } catch (err) {
    next(err);
  }
}

async function me(req, res) {
  res.json({ user: publicUser(req.user) });
}

module.exports = { login, me, registerTenant, registerAdmin };

