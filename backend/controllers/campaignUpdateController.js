import mongoose from "mongoose";
import Campaign from "../models/Campaign.js";
import CampaignUpdate from "../models/CampaignUpdate.js";

// Create campaign update
export const createCampaignUpdate = async (req, res) => {
  try {
    const { campaignId, title, content } = req.body;

    if (!campaignId) {
      return res.status(400).json({
        success: false,
        message: "Campaign ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(campaignId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid campaign ID",
      });
    }

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Update title and content are required",
      });
    }

    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    const update = await CampaignUpdate.create({
      campaign: campaignId,
      title: title.trim(),
      content: content.trim(),
      image: req.file
        ? `/uploads/${req.file.filename}`
        : "",
    });

    res.status(201).json({
      success: true,
      message: "Campaign update created successfully",
      update,
    });
  } catch (err) {
    console.error("Create campaign update error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get all updates for one campaign
export const getCampaignUpdates = async (req, res) => {
  try {
    const { campaignId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(campaignId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid campaign ID",
      });
    }

    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    const updates = await CampaignUpdate.find({
      campaign: campaignId,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      updates,
    });
  } catch (err) {
    console.error("Get campaign updates error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete campaign update
export const deleteCampaignUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid update ID",
      });
    }

    const update = await CampaignUpdate.findByIdAndDelete(id);

    if (!update) {
      return res.status(404).json({
        success: false,
        message: "Campaign update not found",
      });
    }

    res.json({
      success: true,
      message: "Campaign update deleted successfully",
    });
  } catch (err) {
    console.error("Delete campaign update error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
