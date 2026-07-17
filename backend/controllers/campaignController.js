import Campaign from "../models/Campaign.js";

// Create Campaign
export const createCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.create({
  ...req.body,
  image: req.file ? `/uploads/${req.file.filename}` : "",
});

    res.status(201).json({
      success: true,
      campaign,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All Campaigns
export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      campaigns,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get One Campaign
export const getCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    res.json({
      success: true,
      campaign,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update Campaign
export const updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      campaign,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete Campaign
export const deleteCampaign = async (req, res) => {
  try {
    await Campaign.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Campaign deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
