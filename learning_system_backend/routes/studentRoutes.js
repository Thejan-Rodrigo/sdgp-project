import express from "express";
import {
  getStudents,
  getStudentProfile,
  getStudentsBySchool,
  updateStudent,
  getStudentsByParentId,
  getParentById,
  getProgressByParentId,
  getProgressByStudentId, // Add this
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/", getStudents);

// GET student profile by student ID
router.get("/:studentId", getStudentProfile);

// GET all students by school ID
router.get("/school/:schoolId", getStudentsBySchool);

// GET all students by parent ID
router.get("/parent/:parentId", getStudentsByParentId);

// GET parent by ID
router.get("/parent/:parentId/details", getParentById);

// GET progress by parent ID
router.get("/parent/:parentId/progress", getProgressByParentId);

// GET progress by student ID
router.get("/:studentId/progress", getProgressByStudentId); // Add this route

// Update student by ID
router.put("/:studentId", updateStudent);

export default router;