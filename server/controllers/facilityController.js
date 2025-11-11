import Facility from "../models/facilityModel.js";

export const getFacilities = async (req,res) => {
  const facilities = await Facility.find();
  res.json(facilities);
};

export const addFacility = async (req,res) => {
  const facility = await Facility.create(req.body);
  res.status(201).json(facility);
};
