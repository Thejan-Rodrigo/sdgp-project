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
    const { studentId } = req.params;
    const data = await getStudentData(studentId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
