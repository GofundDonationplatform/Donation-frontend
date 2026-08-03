import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {


    const email = (req.body.email || "").trim().toLowerCase();
    const password = req.body.password || "";


    const admin = await User.findOne({
      email,
      isAdmin: true,
    });

    if (!admin) {
      return res.status(401).json({
        error: "Admin account not found",
      });
    }


    const match = await bcrypt.compare(
      password,
      admin.password
    );


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

    return res.json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: "admin",
        isAdmin: true,
      },
    });

  } catch (err) {


    return res.status(500).json({
      error: err.message,
    });

  }
});

export default router;
