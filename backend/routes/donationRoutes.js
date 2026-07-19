import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { getAllDonations } from "../controllers/donationController.js";

const router = express.Router();

// Get all donations (Admin only)
router.get("/", protect, adminOnly, getAllDonations);

export default router;
