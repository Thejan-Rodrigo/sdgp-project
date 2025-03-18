import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Message from "./Message";

const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

const ChatArea = ({ receiverId = "67ceba9febd2b490d7c573c0" }) => {
  const { user } = useAuth();
  const senderId = user?._id || "67ceba38ebd2b490d7c573b8"; // Default parent ID
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/chat/${senderId}/${receiverId}`);
        console.log("Fetched messages:", response.data);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    if (senderId && receiverId) fetchMessages();

    socket.on("receiveMessage", (message) => {
      console.log("New message received:", message);
      if (message.senderId !== senderId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [senderId, receiverId]);

  const handleSendMessage = async (messageContent) => {
    if (!messageContent.trim() || !senderId || !receiverId) return;

    const messageData = {
      senderId,
      receiverId,
      message: messageContent,
      timestamp: new Date().toISOString(),
    };

    console.log("Sending message:", messageData);

    try {
      const response = await axios.post("http://localhost:5000/api/chat/send", messageData);
      const savedMessage = response.data;

      setMessages((prev) => [...prev, savedMessage]);
      socket.emit("sendMessage", savedMessage);
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error.message);
    }
  };

  const handleDeleteMessage = async (messageId, senderId) => {
    if (senderId !== "67ceba38ebd2b490d7c573b8") {
      alert("You can only delete your own messages.");
      return;
    }
  
    try {
      await axios.delete(`http://localhost:5000/api/chat/delete/${messageId}`, {
        data: { userId: senderId },
      });
  
      setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== messageId));
      socket.emit("deleteMessage", messageId);
    } catch (error) {
      console.error("Error deleting message:", error.response?.data || error.message);
    }
  };
  
  

  return (
    <div className="flex-1 flex flex-col h-screen">
      <ChatHeader teacher={{ name: "Teacher Name", subject: "Mathematics" }} />
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <Message key={index} {...msg} currentUserId={senderId} onDelete={() => handleDeleteMessage(msg._id, msg.senderId)} />
          ))
        ) : (
          <p className="text-gray-500 text-center">Start a conversation...</p>
        )}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatArea;
