import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ADMIN LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    const admin = await User.findOne({
      email: email.trim().toLowerCase(),
      isAdmin: true,
    });

    if (!admin) {
      return res.status(401).json({
        error: "Admin account not found",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        role: "admin",
        isAdmin: true,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.json({
      message: "Admin login successful",
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: "admin",
        isAdmin: true,
      },
    });
  } catch (err) {
    console.error("Admin login error:", err);

    res.status(500).json({
      error: "Server error during admin login",
    });
  }
});

// GET ALL USERS
router.get(
  "/users",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 });

      res.json(users);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
);

// DELETE USER
router.delete(
  "/users/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      await User.findByIdAndDelete(req.params.id);

      res.json({
        message: "User deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
);

// TOGGLE ADMIN ROLE
router.put(
  "/users/:id/toggle-admin",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      user.isAdmin = !user.isAdmin;

      await user.save();

      res.json({
        message: "Role updated successfully",
        isAdmin: user.isAdmin,
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
);

export default router;
