import { getStudentProgress } from "../services/chatbotService.js";

// Handle parent's question about student progress
export async function handleChatbot(req, res) {
    try {
        const { parentId, question } = req.body;

        if (!parentId || !question) {
            return res.status(400).json({ message: "Parent ID and question are required." });
        }

        // Call the chatbot service
        const response = await getStudentProgress(parentId, question);
        res.status(200).json({ response });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}