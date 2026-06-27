import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

console.log("Using MONGO_URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
    console.log("Connected!");

    const admins = await User.find({ isAdmin: true });
    console.log("ADMINS:", admins);

    process.exit();
})
.catch(err => {
    console.error("DB ERROR:", err);
    process.exit(1);
});
