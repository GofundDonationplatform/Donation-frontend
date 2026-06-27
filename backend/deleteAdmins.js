import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({ isAdmin: true });
  console.log("Admins deleted");
  process.exit();
};

run();
