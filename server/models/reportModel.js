import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  location: { type: String },
  status: { type: String, enum: ["pending","reviewed","resolved"], default: "pending" }
}, { timestamps: true });

export default mongoose.model("Report", reportSchema);
