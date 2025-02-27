const Student = require('../models/student');

exports.getStudents = async () => {
  return await Student.find();
};

exports.getProgressHistory = async (studentId) => {
  const student = await Student.findById(studentId);
  return student ? student.progressHistory : [];
};

exports.addProgressNote = async (studentId, note) => {
  const student = await Student.findById(studentId);
  if (student) {
    student.progressHistory.push(note);
    await student.save();
  }
  return student;
};