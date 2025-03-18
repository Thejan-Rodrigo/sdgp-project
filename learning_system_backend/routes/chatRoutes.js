import express from "express";
import chatController from "../controllers/chatController.js";

const router = express.Router();

router.post("/send", chatController.sendMessage);
router.get("/:senderId/:receiverId", chatController.getChatHistory);

export default router;
