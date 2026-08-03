import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config({ path: new URL("./.env", import.meta.url) });

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000
    });

    console.log("Connected!");

    const admins = await User.find({ isAdmin: true });
    console.log("ADMINS IN DB:");
    console.log(admins);

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
