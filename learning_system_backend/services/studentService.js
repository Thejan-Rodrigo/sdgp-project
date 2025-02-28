import Student from '../models/student.js';

export const getStudents = async () => {
  return await Student.find();
};

export const getProgressHistory = async (studentId) => {
  const student = await Student.findById(studentId);
  return student ? student.progressHistory : [];
};

export const addProgressNote = async (studentId, note) => {
  const student = await Student.findById(studentId);
  if (student) {
    student.progressHistory.push(note);
    await student.save();
  }
  return student;
};
