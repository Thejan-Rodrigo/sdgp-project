import { getProgressByStudentId, createProgressNote } from "../services/progressService.js";

export const getProgressByStudent = async (req, res) => {
  try {
    const progress = await getProgressByStudentId(req.params.id);
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: "Error fetching progress history", error });
  }
};

export const addProgress = async (req, res) => {
  try {
    const { studentId, notes } = req.body;
    const newProgress = await createProgressNote(studentId, notes);
    res.status(201).json(newProgress);
  } catch (error) {
    res.status(500).json({ message: "Error adding progress note", error });
  }
};
