const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function protect(req, res, next) {
  try {
    const auth = req.headers.authorization || "";
    const [type, token] = auth.split(" ");

    if (type !== "Bearer" || !token) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-passwordHash");
    if (!user) {
      res.status(401);
      throw new Error("Not authorized");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401);
    next(new Error("Not authorized"));
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401);
      return next(new Error("Not authorized"));
    }
    if (!roles.includes(req.user.role)) {
      res.status(403);
      return next(new Error("Forbidden"));
    }
    next();
  };
}

module.exports = { protect, requireRole };

