import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "General",
    },

    goalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    amountRaised: {
      type: Number,
      default: 0,
      min: 0,
    },

    donorCount: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    status: {
     type: String,
     enum: [
     "Pending",
     "Approved",
     "Rejected",
     "Paused",
     "Completed",
    ],
      default: "Pending",
    },
   },
  {
    timestamps: true,
  }
);

export default mongoose.model("Campaign", campaignSchema);
