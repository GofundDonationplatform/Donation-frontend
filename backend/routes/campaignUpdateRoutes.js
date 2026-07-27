import express from "express";
import { upload } from "../middleware/upload.js";

import {
  createCampaignUpdate,
  getCampaignUpdates,
  deleteCampaignUpdate,
} from "../controllers/campaignUpdateController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin campaign update management
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  createCampaignUpdate
);

// Public campaign update browsing
router.get(
  "/campaign/:campaignId",
  getCampaignUpdates
);

// Admin campaign update deletion
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteCampaignUpdate
);

export default router;
