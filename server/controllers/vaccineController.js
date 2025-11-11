import Vaccine from "../models/vaccineModel.js";

export const getVaccines = async (req,res) => {
  const vaccines = await Vaccine.find();
  res.json(vaccines);
};

export const addVaccine = async (req,res) => {
  const vaccine = await Vaccine.create(req.body);
  res.status(201).json(vaccine);
};
