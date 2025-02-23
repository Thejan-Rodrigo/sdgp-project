import Student from "../models/student.js";
import ApiError from "../utils/ApiError.js"; // Corrected default import

export const studentService = {
  async getAllStudents(className, search) {
    const query = {};

    if (className) {
      query.class = className;
    }

    if (search) {
      query.$text = { $search: search };
    }

    return Student.find(query)
      .select("name class currentStatus lastUpdated")
      .sort("-lastUpdated");
  },

  async getStudentById(id) {
    const student = await Student.findById(id);
    if (!student) {
      throw new ApiError(404, "Student not found");
    }
    return student;
  },

  async addProgressNote(id, note, status) {
    const student = await Student.findById(id);
    if (!student) {
      throw new ApiError(404, "Student not found");
    }

    student.progressHistory.push({ note, status });
    student.currentStatus = status;
    student.lastUpdated = new Date();

    return student.save();
  },

  async createStudent(name, className) {
    return Student.create({
      name,
      class: className,
    });
  },
};
