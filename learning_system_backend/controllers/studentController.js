import { getAllStudents } from "../services/studentService.js";
import { fetchStudentProfile, fetchStudentAttendance, fetchStudentProgress } from "../services/studentService.js";

export const getStudents = async (req, res) => {
  try {
    const students = await getAllStudents();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
}

// Get Student Profile
export const getStudentProfile = async (req, res) => {
  try {
    const student = await fetchStudentProfile(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Student Attendance
export const getStudentAttendance = async (req, res) => {
  try {
    const attendance = await fetchStudentAttendance(req.params.id);
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Student Progress
export const getStudentProgress = async (req, res) => {
  try {
    const progress = await fetchStudentProgress(req.params.id);
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
