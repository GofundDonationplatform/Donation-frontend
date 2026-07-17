import Transaction from "../models/Transaction.js";

export const getAllDonations = async (req, res) => {
  try {
    const donations = await Transaction.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: donations.length,
      donations,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
