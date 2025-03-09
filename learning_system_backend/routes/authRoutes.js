import express from "express";
import authController from "../controllers/authController.js";

// Access the methods from the imported authController
const { login, register, getUsersBySchoolId } = authController;

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users/:schoolId", getUsersBySchoolId); // New route

export default router;