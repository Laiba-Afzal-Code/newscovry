import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt.js";

export const protect = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return res.status(401).json({ msg: "No token" });

  const token = auth.split(" ")[1];
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};
