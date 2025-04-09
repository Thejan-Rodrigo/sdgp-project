import {
  getAllStudents,
  getStudentById,
  getStudentsBySchoolId,
  updateStudentById,
  getStudentByParentId,
  getParentById as getParentByIdService,
  getProgressByParentId as getProgressByParentIdService,
  getProgressByStudentId as getProgressByStudentIdService, // Add this
  getAttendanceBySchoolIdService
} from "../services/studentService.js";

export const getStudents = async (req, res) => {
  try {
    const students = await getAllStudents();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};

export const getStudentProfile = async (req, res) => {
  try {
    const student = await getStudentById(req.params.studentId);
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentsBySchool = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const students = await getStudentsBySchoolId(schoolId);

    if (!students.length) {
      return res.status(404).json({ message: "No students found for this school." });
    }

    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error.message);
    res.status(500).json({ message: "Server error." });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const updatedData = req.body;
    console.log(updatedData)

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

export const getStudentsByParentId = async (req, res) => {
  try {
    const { parentId } = req.params;

    // Fetch the parent document to get the studentId(s)
    const parent = await getParentByIdService(parentId);

    if (!parent) {
      return res.status(404).json({ message: "Parent not found." });
    }

    // Fetch the student(s) using the studentId(s) from the parent document
    const students = await getStudentByParentId(parent.student);

    if (!students.length) {
      return res.status(404).json({ message: "No students found for this parent." });
    }

    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students by parent ID:", error.message);
    res.status(500).json({ message: "Server error." });
  }
};

export const getParentById = async (req, res) => {
  try {
    const { parentId } = req.params;

    // Fetch the parent document
    const parent = await getParentByIdService(parentId);

    if (!parent) {
      return res.status(404).json({ message: "Parent not found." });
    }

    res.status(200).json(parent);
  } catch (error) {
    console.error("Error fetching parent:", error.message);
    res.status(500).json({ message: "Server error." });
  }
};

export const getProgressByParentId = async (req, res) => {
  try {
    const { parentId } = req.params;

    // Fetch the parent document to get the studentId(s)
    const parent = await getParentByIdService(parentId);

    if (!parent) {
      return res.status(404).json({ message: "Parent not found." });
    }

    // Fetch progress data for the student(s) associated with the parent
    const progress = await getProgressByParentIdService(parent.student);

    if (!progress.length) {
      return res.status(404).json({ message: "No progress records found for this parent." });
    }

    res.status(200).json(progress);
  } catch (error) {
    console.error("Error fetching progress by parent ID:", error.message);
    res.status(500).json({ message: "Server error." });
  }
};

// Controller to get progress by student ID
export const getProgressByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Fetch progress data for the student
    const progress = await getProgressByStudentIdService(studentId);

    // If no progress records are found, return an empty array
    res.status(200).json(progress);
  } catch (error) {
    console.error("Error fetching progress by student ID:", error.message);
    res.status(500).json({ message: "Server error." });
  }
};

export const getAttendanceBySchoolId = async (req, res, next) => {
  try {
    const { schoolId } = req.params;
    const attendanceRecords = await getAttendanceBySchoolIdService(schoolId);
    
    if (!attendanceRecords || attendanceRecords.length === 0) {
      throw new NotFoundError('No attendance records found for this school');
    }
    
    res.status(200).json({
      success: true,
      data: attendanceRecords
    });
  } catch (error) {
    next(error);
  }
};