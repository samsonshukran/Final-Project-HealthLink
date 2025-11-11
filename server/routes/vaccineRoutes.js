import express from "express";
import { getVaccines, addVaccine } from "../controllers/vaccineController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getVaccines).post(protect,addVaccine);

export default router;
