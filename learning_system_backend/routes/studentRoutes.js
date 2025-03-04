// routes/progressRoutes.mjs
import express from "express";
import { getStudentsByClass, addProgressNote, getProgressHistory } from "../controllers/studentController.js";

const router = express.Router();
router.get("/students/:classId", getStudentsByClass);
router.post("/progress", addProgressNote);
router.get("/progress/:studentId", getProgressHistory);

export default router;