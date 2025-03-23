import ChatService from "../services/chatService.js";

const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const savedMessage = await ChatService.saveMessage({ senderId, receiverId, message });
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getChatHistory = async (req, res) => {
  const { senderId, receiverId } = req.params;
  try {
    const messages = await ChatService.getMessages(senderId, receiverId);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { sendMessage, getChatHistory };