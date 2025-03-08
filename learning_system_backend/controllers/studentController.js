import { getStudentById } from "../services/studentService.js";

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
