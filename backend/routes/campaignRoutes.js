import { upload } from "../middleware/upload.js";
import express from "express";
import {
  createCampaign,
  getCampaigns,
  getCampaign,
  updateCampaign,
  deleteCampaign,
} from "../controllers/campaignController.js";

const router = express.Router();

// Create campaign
router.post("/", upload.single("image"), createCampaign);

// Get all campaigns
router.get("/", getCampaigns);

// Get one campaign
router.get("/:id", getCampaign);

// Update campaign
router.put("/:id", updateCampaign);

// Delete campaign
router.delete("/:id", deleteCampaign);

export default router;
