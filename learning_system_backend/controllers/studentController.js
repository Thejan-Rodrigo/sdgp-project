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
    console.log("Controller function reached"); // Debugging log
    const { studentId } = req.params;
    console.log("Student ID:", studentId);
    
    if (!studentId) {
      return res.status(400).json({ success: false, message: "Student ID is required" });
    }

    const data = await getStudentData(studentId);
    
    if (!data) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export default getStudentDetails;
