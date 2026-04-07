const jwt = require("jsonwebtoken");

function signToken(userId) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Missing JWT_SECRET in environment");
  return jwt.sign({ id: userId }, secret, { expiresIn: "7d" });
}

module.exports = { signToken };

