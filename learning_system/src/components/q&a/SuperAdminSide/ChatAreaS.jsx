import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios"; // Import Axios for API calls
import ChatHeader from "./ChatHeaderS";
import ChatInput from "./ChatInputS";
import Message from "./MessageS";

const socket = io("http://localhost:5000");

const ChatArea = () => {
  const [messages, setMessages] = useState([]);
  const sender = "Admin"; // Replace with dynamic user
  const receiver = "SuperAdmin"; // Replace dynamically

  // Fetch chat history from backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/chat/${sender}/${receiver}`);
        console.log(response.data);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchMessages();

    // Listen for new messages via WebSocket
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [sender, receiver]);

  // Handle sending new messages
  const handleSendMessage = (messageContent) => {
    if (!messageContent.trim()) return;

    const messageData = { sender, receiver, message: messageContent };
    
    // Send message via WebSocket
    socket.emit("message", messageData);
    console.log(messageData)

    // Optimistic UI update (message appears instantly before confirmation)
    setMessages((prev) => [...prev, messageData]);
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      <ChatHeader teacher={{ name: receiver, subject: "Mathematics" }} />
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        {messages.map((message, index) => (
          <Message key={index} {...message} currentUser={sender} />
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatArea;
