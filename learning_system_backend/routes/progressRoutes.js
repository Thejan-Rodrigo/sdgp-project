import express from "express";
import { getProgressByStudent, addProgress } from "../controllers/progressController.js";

const router = express.Router();

router.get("/:id", getProgressByStudent);
router.post("/", addProgress);

export default router;
