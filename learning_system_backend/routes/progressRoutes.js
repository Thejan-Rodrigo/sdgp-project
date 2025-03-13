import express from "express";
import { 
  getProgressByStudent, 
  addProgress, 
  getStudentsBySchoolId, 
  deleteProgressById 
} from "../controllers/progressController.js";

const router = express.Router();

router.get("/student/:id", getProgressByStudent);
router.get("/school/:schoolId", getStudentsBySchoolId);
router.post("/", addProgress);
router.delete("/:id", deleteProgressById); // New route for deleting progress by ID

export default router;