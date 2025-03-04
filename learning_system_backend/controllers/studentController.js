// controllers/progressController.mjs
import Student from "../models/student.js";
import Progress from "../models/progress.js";

export const getStudentsByClass = async (req, res) => {
    try {
        const students = await Student.find({ classId: req.params.classId });
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: "Error fetching students" });
    }
};

export const addProgressNote = async (req, res) => {
    try {
        const { studentId, notes } = req.body;
        const progress = new Progress({ studentId, notes });
        await progress.save();
        res.status(201).json(progress);
    } catch (error) {
        res.status(500).json({ message: "Error saving progress note" });
    }
};

export const getProgressHistory = async (req, res) => {
    try {
        const progressHistory = await Progress.find({ studentId: req.params.studentId }).sort({ createdAt: -1 });
        res.json(progressHistory);
    } catch (error) {
        res.status(500).json({ message: "Error fetching progress history" });
    }
};
