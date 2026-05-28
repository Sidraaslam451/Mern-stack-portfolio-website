import { ResumeDownload, ResumeStats } from "../models/index.js";
 
// TRACK DOWNLOAD — Public
// POST /api/resume/download
export const trackDownload = async (req, res) => {
  try {
    // Download record save karo
    await ResumeDownload.create({
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });
 
    // Total count increment karo
    await ResumeStats.findOneAndUpdate(
      {},                              // Pehla document
      { $inc: { totalDownloads: 1 }, lastUpdated: Date.now() },
      { upsert: true, new: true }     // Nahi mila toh create karo
    );
 
    res.status(200).json({
      success: true,
      message: "Download tracked! 📥",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
 
// GET STATS — Admin only
// GET /api/resume/stats
export const getDownloadStats = async (req, res) => {
  try {
    const stats = await ResumeStats.findOne();
    const recentDownloads = await ResumeDownload.find()
      .sort({ downloadedAt: -1 })
      .limit(10);
 
    // Last 30 days ki downloads
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const monthlyCount = await ResumeDownload.countDocuments({
      downloadedAt: { $gte: thirtyDaysAgo },
    });
 
    res.status(200).json({
      success: true,
      data: {
        total: stats?.totalDownloads || 0,
        thisMonth: monthlyCount,
        recent: recentDownloads,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};