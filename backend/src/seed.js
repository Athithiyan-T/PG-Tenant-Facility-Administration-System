const dotenv = require("dotenv");
dotenv.config();

const bcrypt = require("bcryptjs");
const { connectDB } = require("./utils/connectDB");
const User = require("./models/User");
const Room = require("./models/Room");

async function seed() {
  await connectDB();

  const adminEmail = "admin@pg.com";
  const tenantEmail = "tenant@pg.com";

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash("Admin@123", 10);
    await User.create({ name: "PG Admin", email: adminEmail, passwordHash, role: "admin" });
    console.log("Created admin:", adminEmail, "password: Admin@123");
  } else {
    console.log("Admin already exists:", adminEmail);
  }

  const room = await Room.findOne({ roomNumber: "A-101" });
  const roomDoc =
    room ||
    (await Room.create({
      roomNumber: "A-101",
      floor: 1,
      capacity: 2,
      notes: "Sample seeded room",
    }));

  const existingTenant = await User.findOne({ email: tenantEmail });
  if (!existingTenant) {
    const passwordHash = await bcrypt.hash("Tenant@123", 10);
    const tenant = await User.create({
      name: "Sample Tenant",
      email: tenantEmail,
      passwordHash,
      role: "tenant",
      room: roomDoc._id,
    });
    roomDoc.currentTenants.addToSet(tenant._id);
    await roomDoc.save();
    console.log("Created tenant:", tenantEmail, "password: Tenant@123");
  } else {
    console.log("Tenant already exists:", tenantEmail);
  }

  console.log("Seeding done");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

