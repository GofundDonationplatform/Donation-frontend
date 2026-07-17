// createAdmin.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

dotenv.config();

const start = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
    });

    console.log("Connected!");

    const name = "Admin";
    const email = process.env.ADMIN_EMAIL || "admin@example.com";
    const password = process.env.ADMIN_PASSWORD;

    if (!password) {
      console.log("❌ ADMIN_PASSWORD missing in .env");
      process.exit(1);
    }

    let admin = await User.findOne({ email });

    if (admin) {
      admin.name = name;
      admin.isAdmin = true;
      admin.password = password;

      await admin.save();

      console.log("✅ EXISTING USER PROMOTED TO ADMIN");
    } else {
      admin = await User.create({
      name,
      email,
      password,
      isAdmin: true,
   });

      console.log("✅ ADMIN CREATED SUCCESSFULLY");
    }

    console.log(admin);

    process.exit(0);
  } catch (err) {
    console.error("ERROR:", err);
    process.exit(1);
  }
};

start();
