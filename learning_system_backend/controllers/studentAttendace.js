import { getAttendanceByStudentId } from "../services/studentAttendance.js";

export const getAttendance = async (req, res) => {
  try {
    const attendance = await getAttendanceByStudentId(req.params.id);
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getAttendance;
