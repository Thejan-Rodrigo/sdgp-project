import ChatService from "../services/chatService.js"

const sendMessage = async (req, res) => {
  try {
    const message = await ChatService.saveMessage(req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getChatHistory = async (req, res) => {
  const { sender, receiver } = req.params;
  try {
    const messages = await ChatService.getMessages(sender, receiver);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { sendMessage, getChatHistory };
