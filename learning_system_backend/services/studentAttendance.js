import Attendance from "../models/attendanceModel.js";

// Get attendance by student ID
export const getAttendanceByStudentId = async (studentId) => {
  try {
    const attendance = await Attendance.find({ studentId });
    if (!attendance || attendance.length === 0) {
      throw new Error("Attendance records not found");
    }
    return attendance;
  } catch (error) {
    throw new Error("Error retrieving attendance: " + error.message);
  }
};

export default getAttendanceByStudentId;
