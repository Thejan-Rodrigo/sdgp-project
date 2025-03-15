import express from "express";
import { getStudents } from "../controllers/studentController.js";
import { getStudentProfile } from "../controllers/studentController.js";

const router = express.Router();

router.get("/", getStudents);


// GET student profile by student ID
router.get("/:studentId", getStudentProfile);


export default router;