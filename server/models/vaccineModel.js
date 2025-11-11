import mongoose from "mongoose";

const vaccineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  targetAge: { type: String },
  schedule: { type: String },
  administeredTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

export default mongoose.model("Vaccine", vaccineSchema);
