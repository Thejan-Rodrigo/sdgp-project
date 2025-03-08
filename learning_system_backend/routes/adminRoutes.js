import express from "express";
import adminController from "../controllers/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to add a new admin (Only accessible by super admins)
router.post("/add", authMiddleware, adminController.addAdmin);

export default router;
