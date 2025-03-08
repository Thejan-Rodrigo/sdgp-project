import { getAllStudents } from "../services/studentService.js";
import { fetchStudentProfile, fetchStudentAttendance, fetchStudentProgress } from "../services/studentService.js";
// Get Student Profile
import { getStudentById } from "../services/studentService.js";

export const getStudents = async (req, res) => {
  try {
    const students = await getAllStudents();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
}



export const getStudentProfile = async (req, res) => {
  try {
    const student = await getStudentById(req.params.studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    // Return only required fields
    const { name, studentId, address, attendance, progress } = student;
    res.json({ name, studentId, address, attendance, progress });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
