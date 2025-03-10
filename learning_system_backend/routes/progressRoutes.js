import express from "express";
import { getProgressByStudent, addProgress, getStudentsBySchoolId } from "../controllers/progressController.js";

const router = express.Router();

router.get("/student/:id", getProgressByStudent);
router.get("/school/:schoolId", getStudentsBySchoolId); // New route
router.post("/", addProgress);

export default router;