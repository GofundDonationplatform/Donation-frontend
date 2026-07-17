import Campaign from "../models/Campaign.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalCampaigns = await Campaign.countDocuments();

    const activeCampaigns = await Campaign.countDocuments({
      status: "Active",
    });

    const completedCampaigns = await Campaign.countDocuments({
      status: "Completed",
    });

    const pausedCampaigns = await Campaign.countDocuments({
      status: "Paused",
    });

    const campaigns = await Campaign.find();

    const totalRaised = campaigns.reduce(
      (sum, campaign) => sum + (campaign.amountRaised || 0),
      0
    );

    const totalGoal = campaigns.reduce(
      (sum, campaign) => sum + (campaign.goalAmount || 0),
      0
    );

    res.json({
     success: true,
    stats: {
     totalCampaigns,
     activeCampaigns,
     completedCampaigns,
     pausedCampaigns,
     totalRaised,
     totalGoal,

    averageGoal:
    totalCampaigns > 0
      ? Math.round(totalGoal / totalCampaigns)
      : 0,

    completionRate:
    totalGoal > 0
      ? Math.round((totalRaised / totalGoal) * 100)
      : 0,
     },

    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
