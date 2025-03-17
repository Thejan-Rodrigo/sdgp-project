import express from "express";
import { getStudents } from "../controllers/studentController.js";
import { getStudentProfile ,getStudentsBySchool,updateStudent} from "../controllers/studentController.js";

const router = express.Router();

router.get("/", getStudents);


// GET student profile by student ID
router.get("/:studentId", getStudentProfile);

//get all students by id 
router.get("/school/:schoolId", getStudentsBySchool);

// Update student by ID
router.put("/:studentId", updateStudent);


export default router;