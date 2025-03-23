import express from "express";
import Student  from "../models/Student.js"; // ✅ Fixed Import
import { Teacher } from "../models/Message.js"; // ✅ Fixed Import

const router = express.Router();

// ✅ Get students by school ID
router.get("/students/bySchool/:schoolId", async (req, res) => {
  try {
    const { schoolId } = req.params;
    const students = await Student.find({ schoolId });

    if (!students.length) {
      return res.status(404).json({ message: "No students found for this school" });
    }

    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Get teachers by school ID
router.get("/teachers/bySchool/:schoolId", async (req, res) => {
  try {
    const { schoolId } = req.params;
    const teachers = await Teacher.find({ schoolId });

    if (!teachers.length) {
      return res.status(404).json({ message: "No teachers found for this school" });
    }

    res.status(200).json(teachers);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
