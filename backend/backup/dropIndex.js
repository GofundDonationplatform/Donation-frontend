import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    const donationCollection = collections.find(c => c.name === "donations");

    if (!donationCollection) {
      console.log("⚠️  No 'donations' collection found.");
      process.exit(0);
    }

    const indexes = await db.collection("donations").indexes();
    console.log("📋 Current indexes:", indexes);

    // Try to drop sessionId index if it exists
    const sessionIndex = indexes.find(i => i.name === "sessionId_1");
    if (sessionIndex) {
      await db.collection("donations").dropIndex("sessionId_1");
      console.log("🗑️  Dropped duplicate index: sessionId_1");
    } else {
      console.log("✅ No sessionId_1 index found — nothing to drop.");
    }

  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    mongoose.disconnect();
  }
};

run();
