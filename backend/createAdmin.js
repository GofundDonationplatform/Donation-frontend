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
      serverSelectionTimeoutMS: 30000
    });

    console.log("Connected!");

    const name = "Admin";
    const email = process.env.ADMIN_EMAIL || "admin@example.com";
    const password = process.env.ADMIN_PASSWORD;   // USE ENV PASSWORD

    if (!password) {
      console.log("❌ ADMIN_PASSWORD missing in .env");
      process.exit(1);
    }

    let admin = await User.findOne({ email });

    if (admin) {
      console.log("Admin already exists:", admin.email);
    } else {

      const hashed = await bcrypt.hash(password, 10);

      admin = await User.create({
        name,
        email,
        password: hashed,
        isAdmin: true,
      });

      console.log("✅ ADMIN CREATED SUCCESSFULLY");
    }

    console.log(admin);
    process.exit();

  } catch (err) {
    console.error("ERROR:", err);
    process.exit(1);
  }
};

start();
