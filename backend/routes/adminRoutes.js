import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    console.log("========== ADMIN LOGIN ==========");

    const email = (req.body.email || "").trim().toLowerCase();
    const password = req.body.password || "";

    console.log("EMAIL RECEIVED:", email);
    console.log("PASSWORD LENGTH:", password.length);

    const admin = await User.findOne({
      email,
      isAdmin: true,
    });

    if (!admin) {
      console.log("ADMIN NOT FOUND");
      return res.status(401).json({
        error: "Admin account not found",
      });
    }

    console.log("ADMIN FOUND:", admin.email);
    console.log("HASH:", admin.password);

    const match = await bcrypt.compare(password, admin.password);

    console.log("BCRYPT RESULT:", match);

    if (!match) {
      return res.status(401).json({
        error: "Invalid password",
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

    console.log("LOGIN SUCCESS");

    return res.json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        isAdmin: true,
      },
    });

  } catch (err) {

    console.log("LOGIN ERROR:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
});

export default router;
