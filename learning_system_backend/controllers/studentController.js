import { getStudentById } from "../services/studentService.js";

export const getStudent = async (req, res) => {
  try {
    const student = await getStudentById(req.params.id);
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getStudent;
