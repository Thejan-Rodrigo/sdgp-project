import { getStudentById } from "../services/studentService.js";

export const getStudent = async (req, res) => {
  console.log("hi c");
  console.log("Received student ID:", req.params.id);
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


