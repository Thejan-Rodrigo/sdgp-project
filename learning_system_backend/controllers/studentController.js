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
    console.log("hi c1");
    const student = await getStudentById(req.params.id);
    console.log("hi c2");
    res.json(student);
    console.log("hi c3");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


