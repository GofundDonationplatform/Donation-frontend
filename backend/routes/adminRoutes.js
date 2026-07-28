import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {

    console.log("====================================");
    console.log("DEBUG-ADMIN-LOGIN-V1");
    console.log("====================================");

    const email = (req.body.email || "").trim().toLowerCase();
    const password = req.body.password || "";

    console.log("EMAIL:", email);
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
    console.log("ADMIN ID:", admin._id.toString());
    console.log("HASH:", admin.password);

    const match = await bcrypt.compare(
      password,
      admin.password
    );

    console.log("BCRYPT RESULT:", match);

    if (!match) {
      console.log("LOGIN FAILED");

      return res.status(401).json({
        error: "Invalid password",
      });
    }

    console.log("LOGIN SUCCESS");

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
        isAdmin: true,
      },
    });

  } catch (err) {

    console.log("LOGIN ERROR");
    console.log(err);

    return res.status(500).json({
      error: err.message,
    });

  }
});

export default router;
