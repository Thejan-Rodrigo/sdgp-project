import express from "express";
import authController from "../controllers/authController.js";

// Access the login method from the imported authController
const { login, register } = authController;

const router = express.Router();

router.post("/register", register);
// Login Route
router.post("/login", login);

export default router;
