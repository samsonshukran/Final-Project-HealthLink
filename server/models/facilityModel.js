import mongoose from "mongoose";

const facilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["Hospital","Clinic","Pharmacy"], default: "Clinic" },
  location: { type: String, required: true },
  contact: { type: String },
  hours: { type: String },
  services: { type: [String] }
}, { timestamps: true });

export default mongoose.model("Facility", facilitySchema);
