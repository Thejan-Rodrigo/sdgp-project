import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import ChatHeader from "./ChatHeaderS";
import ChatInput from "./ChatInputS";
import Message from "./MessageS";

const socket = io("http://localhost:5000");

const ChatArea = () => {
  const senderId = "67ca7c9f7800be438ae1efc1"; // SuperAdmin ID (for testing)
  const receiverId = "67ceb8c8c1c3dfe20547e3d6"; // Admin ID (for testing)
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/chat/${senderId}/${receiverId}`);
        console.log("Chat history:", response.data);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchMessages();

    // ✅ SuperAdmin joins their socket room
    socket.emit("join", senderId);

    // ✅ Listen for new incoming messages
    socket.on("receiveMessage", (message) => {
      console.log("New message received:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // ✅ Listen for deleted messages
    socket.on("messageDeleted", (messageId) => {
      setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== messageId));
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("messageDeleted");
    };
  }, [senderId, receiverId]);

  const handleSendMessage = async (messageContent) => {
    if (!messageContent.trim()) return;

    const messageData = {
      senderId,
      receiverId,
      message: messageContent,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await axios.post("http://localhost:5000/api/chat/send", messageData);
      const savedMessage = response.data;

      // ✅ Update state immediately for instant UI feedback
      setMessages((prev) => [...prev, savedMessage]);

      // ✅ Emit message through WebSocket for real-time update
      socket.emit("sendMessage", savedMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleDeleteMessage = async (messageId, senderIdFromMsg) => {
    if (senderIdFromMsg !== "67ca7c9f7800be438ae1efc1") {
      alert("You can only delete your own messages.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/chat/delete/${messageId}`, {
        data: { userId: senderId },
      });

      // ✅ Remove from UI instantly
      setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== messageId));

      // ✅ Emit delete event for real-time sync
      socket.emit("deleteMessage", messageId);
    } catch (error) {
      console.error("Error deleting message:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      <ChatHeader admin={{ name: receiverId }} />
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        {messages.map((message, index) => (
          <Message
            key={index}
            {...message}
            currentUserId={senderId}
            onDelete={() => handleDeleteMessage(message._id, message.senderId)}
          />
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatArea;
