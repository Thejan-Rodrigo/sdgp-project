import express from "express";
import authController from "../controllers/authController.js";

// Access the methods from the imported authController
const { login, register, getUsersBySchoolId, deleteTeacherById, deleteParentAndStudentById } = authController;

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users/:schoolId", getUsersBySchoolId); // Get users by school ID
router.delete("/teachers/:teacherId", deleteTeacherById); // Delete teacher by ID
router.delete("/parents/:parentId", deleteParentAndStudentById); // Delete parent and student by parent ID

export default router;