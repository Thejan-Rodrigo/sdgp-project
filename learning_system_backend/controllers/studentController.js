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
    const student = await getStudentById(req.params.id);
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getStudent;
