import express from "express";
import { upload } from "../middleware/upload.js";

import {
  createCampaignUpdate,
  getCampaignUpdates,
  deleteCampaignUpdate,
} from "../controllers/campaignUpdateController.js";

const router = express.Router();

// Create campaign update
router.post(
  "/",
  upload.single("image"),
  createCampaignUpdate
);

// Get updates for one campaign
router.get(
  "/campaign/:campaignId",
  getCampaignUpdates
);

// Delete campaign update
router.delete(
  "/:id",
  deleteCampaignUpdate
);

export default router;
