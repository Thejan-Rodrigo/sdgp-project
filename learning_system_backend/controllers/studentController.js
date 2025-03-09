import { getStudentData } from "../services/studentService.js";

const getStudentDetails = async (req, res) => {
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
