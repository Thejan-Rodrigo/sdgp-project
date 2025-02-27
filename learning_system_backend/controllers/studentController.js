const studentService = require('../services/studentService');

exports.getStudents = async (req, res, next) => {
  try {
    const students = await studentService.getStudents();
    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
};

exports.getProgressHistory = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const progressHistory = await studentService.getProgressHistory(studentId);
    res.status(200).json(progressHistory);
  } catch (err) {
    next(err);
  }
};

exports.addProgressNote = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const { note } = req.body;
    const updatedStudent = await studentService.addProgressNote(studentId, note);
    res.status(200).json(updatedStudent);
  } catch (err) {
    next(err);
  }
};