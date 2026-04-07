const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/auth.routes");
const roomRoutes = require("./routes/room.routes");
const complaintRoutes = require("./routes/complaint.routes");
const serviceRoutes = require("./routes/service.routes");
const { notFound, errorHandler } = require("./middleware/error.middleware");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/services", serviceRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

