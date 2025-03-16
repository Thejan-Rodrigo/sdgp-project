import { getAllStudents } from "../services/studentService.js";
import { fetchStudentProfile, fetchStudentAttendance, fetchStudentProgress } from "../services/studentService.js";
// Get Student Profile
import { getStudentById } from "../services/studentService.js";
import { getStudentsBySchoolId } from "../services/studentService.js";
import { updateStudentById } from "../services/studentService.js";

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


// Controller to get all students by school ID
export const getStudentsBySchool = async (req, res) => {
  try {
    console.log("c1");
    const { schoolId } = req.params;

    // Get students from the service
    const students = await getStudentsBySchoolId(schoolId);

    // Check if students are found
    if (!students.length) {
      return res.status(404).json({ message: "No students found for this school." });
    }
    console.log("c2");
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error.message);
    res.status(500).json({ message: "Server error." });
  }
};


// Update student details
export const updateStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const updatedData = req.body;

    const updatedStudent = await updateStudentById(studentId, updatedData);

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error("Error updating student:", error.message);
    res.status(500).json({ message: "Server error." });
  }
};


