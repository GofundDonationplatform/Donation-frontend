import jwt from "jsonwebtoken";

export function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Token failed or expired",
    });
  }
}

export function adminOnly(req, res, next) {
  if (
    req.user &&
    (
      req.user.isAdmin === true ||
      req.user.role === "admin"
    )
  ) {
    return next();
  }

  return res.status(403).json({
    message: "Admin access denied",
  });
}
