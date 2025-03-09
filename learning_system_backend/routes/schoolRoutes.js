import express from "express";
import schoolController from "../controllers/schoolController.js";
import authMiddleware from "../middleware/authMiddleware.js"; // Middleware to verify super admin

const router = express.Router();

// Only super admins can create schools
router.post("/create", authMiddleware, schoolController.createSchool);

// Get all schools
router.get("/getallschools", schoolController.getAllSchools);

export default router;
