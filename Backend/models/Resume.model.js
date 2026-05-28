import mongoose from 'mongoose';

const resumeDownloadSchema = new mongoose.Schema(
  {
    ipAddress: String,
    userAgent: String, 
    downloadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
 
const resumeStatsSchema = new mongoose.Schema({
  totalDownloads: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
});
 
export const ResumeDownload = mongoose.model("ResumeDownload", resumeDownloadSchema);
export const ResumeStats = mongoose.model("ResumeStats", resumeStatsSchema);