import express from "express";
import { handleChatbot } from "../controllers/chatbotController.js";

const router = express.Router();

// POST /api/chatbot
router.post("/", handleChatbot);

export default router;