import Student from "../models/Student.js";
import User from "../models/User.js"; // Import the User model (assuming Teacher is in the users collection)
import Progress from "../models/Progress.js"; // Import the Progress model
import Attendance from '../models/Attendance.js';

export const getAllStudents = async () => {
  return await Student.find();
};

export const fetchStudentProfile = async (studentId) => {
  return await Student.findById(studentId);
};

export const fetchStudentAttendance = async (studentId) => {
  return await Attendance.find({ studentId });
};

export const fetchStudentProgress = async (studentId) => {
  return await Progress.find({ studentId });
};

// Updated service to get student by ID
export const getStudentById = async (studentId) => {
  try {
    // Fetch student by ID
    const student = await Student.findById(studentId);

    if (!student) {
      throw new Error("Student not found");
    }

    // Fetch parent details using the parent ID in the student document
    const parent = await User.findById(student.parent);

    // Add parent's first name and last name to the student object
    const studentWithParent = {
      ...student.toObject(), // Convert Mongoose document to plain object
      parentFirstName: parent ? parent.firstName : "Unknown",
      parentLastName: parent ? parent.lastName : "Parent",
    };

    return studentWithParent;
  } catch (error) {
    throw new Error("Error fetching student by ID");
  }
};

// Updated service to get students by school ID
export const getStudentsBySchoolId = async (schoolId) => {
  try {
    // Fetch students by school ID
    const students = await Student.find({ schoolId });

    // Fetch parent details for each student
    const studentsWithParent = await Promise.all(
      students.map(async (student) => {
        const parent = await User.findById(student.parent); // Fetch parent details
        return {
          ...student.toObject(), // Convert Mongoose document to plain object
          parentFirstName: parent ? parent.firstName : "Unknown",
          parentLastName: parent ? parent.lastName : "Parent",
        };
      })
    );

    return studentsWithParent;
  } catch (error) {
    throw new Error("Error fetching students by school ID");
  }
};

export const updateStudentById = async (studentId, updatedData) => {
  try {
    const student = await Student.findByIdAndUpdate(studentId, updatedData, { new: true });
    return student;
  } catch (error) {
    throw new Error("Error updating student details");
  }
};

export const getStudentByParentId = async (studentIds) => {
  try {
    const students = await Student.find({ _id: { $in: studentIds } });
    return students;
  } catch (error) {
    throw new Error("Error fetching students by parent ID");
  }
};

export const getParentById = async (parentId) => {
  try {
    const parent = await User.findById(parentId); // Fetch from the users collection
    return parent;
  } catch (error) {
    throw new Error("Error fetching parent");
  }
};

export const getProgressByParentId = async (studentIds) => {
  try {
    // Fetch progress data for the student(s) associated with the parent
    const progressRecords = await Progress.find({ studentId: { $in: studentIds } })
      .populate({
        path: 'teacherId',
        select: 'firstName lastName', // Only get these fields from User
        model: 'User' // The model to populate from
      })
      .lean(); // Convert to plain JavaScript objects

    // Format the response to include teacher names
    const formattedProgress = progressRecords.map(record => ({
      ...record,
      teacherName: record.teacherId 
        ? `${record.teacherId.firstName} ${record.teacherId.lastName}`
        : 'Unknown Teacher'
    }));

    return formattedProgress;
  } catch (error) {
    console.error("Error fetching progress by parent ID:", error);
    throw new Error("Error fetching progress by parent ID");
  }
};

// Updated service to get progress by student ID
export const getProgressByStudentId = async (studentId) => {
  try {
    // Fetch progress data for the student
    const progress = await Progress.find({ studentId });

    // If no progress records are found, return an empty array
    if (!progress || progress.length === 0) {
      return [];
    }

    // Fetch teacher details for each progress record
    const progressWithTeacher = await Promise.all(
      progress.map(async (record) => {
        const teacher = await User.findById(record.teacherId); // Fetch teacher details
        return {
          ...record.toObject(), // Convert Mongoose document to plain object
          teacherFirstName: teacher ? teacher.firstName : "Unknown",
          teacherLastName: teacher ? teacher.lastName : "Teacher",
        };
      })
    );

    return progressWithTeacher;
  } catch (error) {
    throw new Error("Error fetching progress by student ID");
  }
};

export const getAttendanceBySchoolIdService = async (schoolId) => {
  try {
    // First get all students in this school
    const schoolStudents = await Student.find({ schoolId }, '_id');
    const studentIds = schoolStudents.map(s => s._id.toString());
    
    // Then get all attendance records that include these students
    const attendanceRecords = await Attendance.aggregate([
      {
        $match: {
          'students.id': { $in: studentIds }
        }
      },
      {
        $addFields: {
          students: {
            $filter: {
              input: '$students',
              as: 'student',
              cond: { $in: ['$$student.id', studentIds] }
            }
          }
        }
      },
      {
        $match: {
          students: { $ne: [] } // Only include records with matching students
        }
      },
      { $sort: { date: -1 } }
    ]);
    
    return attendanceRecords;
  } catch (error) {
    console.error('Error in getAttendanceBySchoolIdService:', error);
    throw error;
  }
};
