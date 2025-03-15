import { getProgressByStudentId } from "../services/studentProgress.js";

export const getProgress = async (req, res) => {
  try {
    const progress = await getProgressByStudentId(req.params.id);
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getProgress;
