import {Message} from "../models/Message.js";

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

export default { saveMessage, getMessages };
