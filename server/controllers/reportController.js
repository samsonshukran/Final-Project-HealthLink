import Report from "../models/reportModel.js";

export const createReport = async (req,res) => {
  const { title, description, location } = req.body;
  const report = await Report.create({
    title, description, location, reportedBy: req.user._id
  });
  res.status(201).json(report);
};

export const getReports = async (req,res) => {
  const reports = await Report.find().populate("reportedBy","username email");
  res.json(reports);
};
