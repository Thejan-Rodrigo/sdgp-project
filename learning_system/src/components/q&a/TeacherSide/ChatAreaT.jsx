import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import ChatHeader from "./ChatHeaderT";
import ChatInput from "./ChatInputT";
import Message from "./MessageT";

const socket = io("http://localhost:5000");

const ChatArea = () => {
  const senderId = "67ceba9febd2b490d7c573c0"; // Teacher ID (for testing)
  const receiverId = "67ceba38ebd2b490d7c573b8"; // Parent ID (for testing)
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/chat/${senderId}/${receiverId}`);
        console.log(response.data);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchMessages();
    socket.emit("join", senderId); // ✅ Ensure teacher joins their socket room

    socket.on("receiveMessage", (message) => {
      console.log("New message received:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
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

      setMessages((prev) => [...prev, savedMessage]);

      socket.emit("sendMessage", savedMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      <ChatHeader teacher={{ name: receiverId, subject: "Mathematics" }} />
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        {messages.map((message, index) => (
          <Message key={index} {...message} currentUserId={senderId} />
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatArea;
