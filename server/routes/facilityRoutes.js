import express from "express";
import { getFacilities, addFacility } from "../controllers/facilityController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getFacilities).post(protect,addFacility);

export default router;
