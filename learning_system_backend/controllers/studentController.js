// controllers/studentController.js
import { getStudentData } from "../services/studentService.js";

export const getStudentDetails = async (req, res) => {
  try {
    const { studentId } = req.params;
    const data = await getStudentData(studentId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
