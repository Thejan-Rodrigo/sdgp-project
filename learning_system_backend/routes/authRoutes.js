import express from "express";
import authController from "../controllers/authController.js";

// Access the login method from the imported authController
const { login } = authController;

const router = express.Router();

// Login Route
router.post("/login", login);

export default router;
