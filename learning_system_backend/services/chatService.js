import Message from "../models/Message.js"

const saveMessage = async (data) => {
  try {
    const message = new Message(data);
    console.log("hello")
    await message.save();
    return message;
  } catch (error) {
    throw new Error("Error saving message");
  }
};

const getMessages = async (sender, receiver) => {
  return await Message.find({
    $or: [
      { sender, receiver },
      { sender: receiver, receiver: sender },
    ],
  }).sort({ timestamp: 1 });
};

export default { saveMessage, getMessages };
