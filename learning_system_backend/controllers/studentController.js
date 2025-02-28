import {getStudents,getProgressHistory, addProgressNote} from '../services/studentService.js';

export const getStudentsx = async (req, res, next) => {
  try {
    const students = await getStudents();
    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
};

export const getProgressHistoryx = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const progressHistory = await getProgressHistory(studentId);
    res.status(200).json(progressHistory);
  } catch (err) {
    next(err);
  }
};

export const addProgressNotex = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const { note } = req.body;
    const updatedStudent = await addProgressNote(studentId, note);
    res.status(200).json(updatedStudent);
  } catch (err) {
    next(err);
  }
};
