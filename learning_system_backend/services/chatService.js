import { Message } from "../models/Message.js";

const saveMessage = async (data) => {
  try {
    const message = new Message({
      senderId: data.senderId,
      receiverId: data.receiverId,
      message: data.message,
    });
    await message.save();
    return message;
  } catch (error) {
    throw new Error("Error saving message");
  }
};

const getMessages = async (senderId, receiverId) => {
  return await Message.find({
    $or: [
      { senderId, receiverId },
      { senderId: receiverId, receiverId: senderId },
    ],
  }).sort({ createdAt: 1 }); // Sort by timestamp
};

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

export default { saveMessage, getMessages };