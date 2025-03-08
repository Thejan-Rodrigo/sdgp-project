import express from "express";
import { getStudentProfile } from "../controllers/studentController.js";

const router = express.Router();

// GET student profile by student ID
router.get("/:studentId", getStudentProfile);

export default router;
