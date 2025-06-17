import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
   await user.save();
  const token = jwt.sign({ id: user._id, name, email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  res.status(201).json({ token, user: { id: user._id, name, email } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });
  const valid = await user.comparePassword(password);
  if (!valid) return res.status(400).json({ msg: "Invalid credentials" });
  const token = jwt.sign({ id: user._id, name: user.name, email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  res.json({ token, user: { id: user._id, name: user.name, email } });
};
