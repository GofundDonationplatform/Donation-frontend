import { upload } from "../middleware/upload.js";
import express from "express";
import {
  createCampaign,
  getCampaigns,
  getCampaign,
  updateCampaign,
  deleteCampaign,
} from "../controllers/campaignController.js";
import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Public campaign browsing
router.get("/", getCampaigns);
router.get("/:id", getCampaign);

// Admin campaign management
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  createCampaign
);

router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("image"),
  updateCampaign
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteCampaign
);

export default router;
