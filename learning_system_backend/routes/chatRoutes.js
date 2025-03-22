import express from "express";
import {Student} from "../models/Message.js"; // Import Student model

const router = express.Router();

// Get students by school ID
router.get("/bySchool/:schoolId", async (req, res) => {
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

export default router;
