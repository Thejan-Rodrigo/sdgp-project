import express from "express";
import chatController from "../controllers/chatController.js"; // Import the default export

const router = express.Router();

router.post("/send", chatController.sendMessage);
router.get("/:sender/:receiver", chatController.getChatHistory);

export default router;

