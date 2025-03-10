import express from "express";
import adminController from "../controllers/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to add a new admin (Only accessible by super admins)
router.post("/add", authMiddleware, adminController.addAdmin);

// Route to get admins by school ID (Only accessible by super admins)
router.get("/school/:schoolId", authMiddleware, adminController.getAdminsBySchoolId);

// Route to delete an admin by ID (Only accessible by super admins)
router.delete("/:adminId", authMiddleware, adminController.deleteAdminById);

export default router;