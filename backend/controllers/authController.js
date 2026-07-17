// backend/controllers/authController.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({ name, email, password });

    res.json({
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user._id, user.role),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Account not found" });

    const match = await user.matchPassword(password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
      token: generateToken(user._id, user.role),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN LOGIN
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ email });

  if (!admin || !admin.isAdmin) {
  return res.status(403).json({ message: "Not an admin" });
 }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    res.json({
      message: "Admin login successful",
      admin: {
        id: admin._id,
        name: admin.name,
        role: admin.role,
      },
      token: generateToken(admin._id, admin.role),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
